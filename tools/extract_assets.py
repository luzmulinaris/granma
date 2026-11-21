"""Extrae del PDF de diseño los recursos que usa la web.

Uso:  python tools/extract_assets.py "scrollytelling V01.pdf"

Genera:
  public/img/*.webp   fotos embebidas + ilustraciones rasterizadas
  public/svg/*.svg    piezas vectoriales (logo, auto, moto, avión...)
  src/data/geo.json   coordenadas (en puntos de página) para animar líneas,
                      multitud, manzanas, llamadas de texto, etc.

Los índices de dibujo están atados a esta versión del PDF (V01).
"""
import io, json, sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PDF = sys.argv[1] if len(sys.argv) > 1 else str(ROOT / "scrollytelling V01.pdf")
IMG = ROOT / "public" / "img"
SVG = ROOT / "public" / "svg"
DATA = ROOT / "src" / "data"
for d in (IMG, SVG, DATA):
    d.mkdir(parents=True, exist_ok=True)

doc = fitz.open(PDF)
geo = {}
_draw_cache = {}


def drawings(pn):
    if pn not in _draw_cache:
        _draw_cache[pn] = doc[pn - 1].get_drawings()
    return _draw_cache[pn]


def r4(rect):
    return [round(rect.x0, 1), round(rect.y0, 1), round(rect.width, 1), round(rect.height, 1)]


def save_webp(pix, name, quality=82, max_side=2000):
    mode = "RGBA" if pix.alpha else "RGB"
    im = Image.frombytes(mode, (pix.width, pix.height), pix.samples)
    if max(im.size) > max_side:
        k = max_side / max(im.size)
        im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    im.save(IMG / f"{name}.webp", "WEBP", quality=quality, method=6)
    return im.size


# ---------------------------------------------------------------- fotos
PHOTOS = {
    262: "diarios", 15: "escobar-mug", 247: "congreso", 17: "denuncia", 18: "preso-1976",
    251: "lara-auto", 19: "extraditables", 20: "cano", 21: "galan",
    23: "espectador-1", 24: "espectador-2", 25: "avianca-1", 26: "avianca-2",
    27: "das-1", 28: "das-2", 29: "das-3", 30: "garcia-herreros", 31: "gaceta", 32: "rejas",
    34: "mapa-envigado", 184: "pin",
    35: "recluso-1", 39: "recluso-2", 36: "recluso-3", 37: "recluso-4", 38: "recluso-5",
    144: "sebusca-1", 143: "sebusca-2", 142: "sebusca-3", 43: "sebusca-4", 45: "sebusca-5",
    42: "sebusca-6", 46: "sebusca-7", 44: "sebusca-8",
    47: "tras-1", 48: "tras-2", 49: "tras-3", 50: "tras-4",
    51: "torre", 52: "torre-interior", 53: "radio", 117: "operativo",
}


def extract_photos():
    for xref, name in PHOTOS.items():
        pix = fitz.Pixmap(doc, xref)
        if pix.n - pix.alpha >= 4 or pix.colorspace is None or pix.colorspace.n != 3:
            pix = fitz.Pixmap(fitz.csRGB, pix)
        smask = doc.extract_image(xref)["smask"]
        if smask:
            mask = fitz.Pixmap(doc, smask)
            if pix.alpha:
                pix = fitz.Pixmap(pix, 0)
            pix = fitz.Pixmap(pix, mask)
        save_webp(pix, name)
    # posición de cada foto en cada página
    place = {}
    for pn in range(1, len(doc) + 1):
        for im in doc[pn - 1].get_image_info(xrefs=True):
            if im["xref"] in PHOTOS:
                place.setdefault(PHOTOS[im["xref"]], {})[f"p{pn}"] = r4(fitz.Rect(im["bbox"]))
    geo["fotos"] = place


# ------------------------------------------------- redibujo de vectores
def redraw(pn, idx, pad=2, clip=None):
    """Copia a una página nueva sólo los dibujos `idx` de la página pn."""
    ds = [drawings(pn)[i] for i in idx]
    if clip is None:
        clip = fitz.Rect()
        for d in ds:
            w = (d.get("width") or 0) / 2 + pad
            clip |= d["rect"] + (-w, -w, w, w)
    out = fitz.open()
    pg = out.new_page(width=clip.width, height=clip.height)
    sh = pg.new_shape()
    off = fitz.Point(-clip.x0, -clip.y0)
    for d in ds:
        for it in d["items"]:
            k = it[0]
            if k == "l":
                sh.draw_line(it[1] + off, it[2] + off)
            elif k == "re":
                sh.draw_rect(it[1] + (off.x, off.y, off.x, off.y))
            elif k == "qu":
                q = it[1]
                sh.draw_quad(fitz.Quad(q.ul + off, q.ur + off, q.ll + off, q.lr + off))
            elif k == "c":
                sh.draw_bezier(it[1] + off, it[2] + off, it[3] + off, it[4] + off)
        caps = d.get("lineCap") or (0,)
        sh.finish(
            fill=d.get("fill"), color=d.get("color"), dashes=d.get("dashes"),
            even_odd=d.get("even_odd", True), closePath=d.get("closePath", False),
            lineJoin=d.get("lineJoin") or 0, lineCap=max(caps) if isinstance(caps, (tuple, list)) else caps,
            width=d.get("width") or 0,
            stroke_opacity=d.get("stroke_opacity") if d.get("stroke_opacity") is not None else 1,
            fill_opacity=d.get("fill_opacity") if d.get("fill_opacity") is not None else 1,
        )
    sh.commit()
    return pg, clip


def sprite_svg(name, pn, idx, pad=2):
    pg, clip = redraw(pn, idx, pad)
    (SVG / f"{name}.svg").write_text(pg.get_svg_image(text_as_path=False), encoding="utf-8")
    geo.setdefault("sprites", {})[name] = r4(clip)


def sprite_webp(name, pn, idx, scale=2, pad=2, clip=None):
    pg, clip = redraw(pn, idx, pad, clip)
    pix = pg.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=True)
    save_webp(pix, name, quality=88, max_side=3600)
    geo.setdefault("sprites", {})[name] = r4(clip)


def clip_webp(name, pn, rect, scale=2, quality=85):
    rect = fitz.Rect(rect)
    pix = doc[pn - 1].get_pixmap(matrix=fitz.Matrix(scale, scale), clip=rect, alpha=False)
    save_webp(pix, name, quality=quality, max_side=3600)
    geo.setdefault("sprites", {})[name] = r4(rect)


def R(a, b):
    return list(range(a, b + 1))


def pts(pn, i):
    """Vértices de un trazo hecho de líneas."""
    out = []
    for it in drawings(pn)[i]["items"]:
        if it[0] == "l":
            if not out or out[-1] != [round(it[1].x, 1), round(it[1].y, 1)]:
                out.append([round(it[1].x, 1), round(it[1].y, 1)])
            out.append([round(it[2].x, 1), round(it[2].y, 1)])
    return out


def body(pn):
    """Índices de dibujo que no son la cabecera."""
    return [i for i, d in enumerate(drawings(pn)) if d["rect"].y1 > 141]


def hx(c):
    return None if c is None else "#%02x%02x%02x" % tuple(round(v * 255) for v in c)


def is_label(d):
    f, c, w = hx(d.get("fill")), hx(d.get("color")), d.get("width") or 0
    if f == "#d5d7d8" and c == "#d91403":
        return True
    if c == "#d91403" and f is None and abs(w - 3) < 0.1:
        return True
    if f == "#d91403" and c is None and d["rect"].width < 20:
        return True
    return False


def callouts(pn):
    """Líneas guía rojas (w=3) + su cuadradito + caja de texto más cercana."""
    ds = drawings(pn)
    page = doc[pn - 1]
    boxes = [d["rect"] for d in ds if hx(d.get("fill")) == "#d5d7d8" and hx(d.get("color")) == "#d91403"]
    out = []
    for i, d in enumerate(ds):
        if hx(d.get("color")) == "#d91403" and d.get("fill") is None and abs((d.get("width") or 0) - 3) < 0.1:
            line = pts(pn, i)
            sq = ds[i + 1]["rect"]
            c = [(sq.x0 + sq.x1) / 2, (sq.y0 + sq.y1) / 2]
            # ordenar la línea para que empiece en la caja y termine en el cuadradito
            d0 = (line[0][0] - c[0]) ** 2 + (line[0][1] - c[1]) ** 2
            d1 = (line[-1][0] - c[0]) ** 2 + (line[-1][1] - c[1]) ** 2
            if d0 < d1:
                line = line[::-1]
            start = fitz.Point(*line[0])
            box = min(boxes, key=lambda b: max(b.x0 - start.x, 0, start.x - b.x1) ** 2 + max(b.y0 - start.y, 0, start.y - b.y1) ** 2)
            text = " ".join(page.get_text("text", clip=box + (-2, -2, 2, 2)).split())
            out.append({"line": line, "dot": [round(c[0], 1), round(c[1], 1)], "box": r4(box), "text": text})
    return out


def main():
    extract_photos()

    # --- piezas vectoriales sueltas
    sprite_svg("logo", 1, R(4, 66))
    sprite_svg("auto", 11, R(74, 86))
    sprite_svg("moto", 11, R(88, 94))
    sprite_svg("estallido", 12, [98])
    sprite_svg("avion", 27, [75])
    sprite_svg("montanas", 27, [73, 74])
    sprite_svg("flecha-sube", 27, [76, 77, 78])
    sprite_svg("flecha-cae", 28, [76, 77, 78])
    sprite_svg("brujula", 35, R(75, 81))

    # --- ilustraciones complejas rasterizadas
    clip_webp("mapa-bogota", 10, (862, 552, 1552, 1140), 2.5)
    cat = [i for i in body(36)]
    pg, clip = redraw(36, cat)
    sprite_webp("catedral", 36, cat, 2, clip=clip)
    sprite_webp("catedral-roja", 37, body(37), 2, clip=clip)
    ds41 = drawings(41)
    cat41 = [i for i in body(41) if i < 615 and hx(ds41[i].get("fill")) != "#231f20"]
    _, clip41 = redraw(41, cat41)
    geo["sprites"]["catedral-p41"] = r4(clip41)
    hab = [i for i in body(38) if not is_label(drawings(38)[i])]
    sprite_webp("habitacion", 38, hab, 2.5)

    # --- geometría para animar con SVG
    geo["flechas"] = {
        "p11": pts(11, 95), "p13-moto": pts(13, 87), "p13-auto": pts(13, 102),
    }
    geo["auto_p13"] = r4(drawings(13)[89]["rect"])
    geo["ruta"] = pts(35, 73)
    # multitud (p20): cada persona = cabeza (f) + cuerpo (s)
    ds = drawings(20)
    crowd = []
    for i in range(74, 393, 2):
        r = ds[i]["rect"] | ds[i + 1]["rect"]
        crowd.append([round((r.x0 + r.x1) / 2, 1), round((r.y0 + r.y1) / 2, 1)])
    geo["multitud"] = crowd
    pg, clip = redraw(20, [74, 75])
    (SVG / "persona.svg").write_text(pg.get_svg_image(), encoding="utf-8")
    geo["sprites"]["persona"] = r4(clip)
    ds21 = drawings(21)
    geo["sicarios"] = [[round((ds21[i]["rect"] | ds21[i + 1]["rect"]).x0 + (ds21[i]["rect"] | ds21[i + 1]["rect"]).width / 2, 1),
                        round((ds21[i]["rect"] | ds21[i + 1]["rect"]).y0 + (ds21[i]["rect"] | ds21[i + 1]["rect"]).height / 2, 1)] for i in (268, 270)]
    sprite_svg("tarima-persona", 20, [394, 395])
    geo["tarima"] = [r4(ds[i]["rect"] | ds[i + 1]["rect"]) for i in (394, 398, 400)] if len(ds) > 401 else []
    geo["disparos_p22"] = [r4(d["rect"]) for d in drawings(22) if hx(d.get("fill")) in ("#e0040a", "#ed1c24") and len(d["items"]) > 10]

    # manzanas (p48): 30 bloques de 3 dibujos (relleno, borde, grilla)
    ds = drawings(48)
    blocks = []
    for i in range(73, 163, 3):
        f = ds[i]
        quad = None
        for it in f["items"]:
            if it[0] == "qu":
                q = it[1]
                quad = [[round(p.x, 1), round(p.y, 1)] for p in (q.ul, q.ur, q.lr, q.ll)]
        if quad is None:
            quad = pts(48, i)[:4]
        grid = []
        for it in ds[i + 2]["items"]:
            if it[0] == "l":
                grid.append([round(it[1].x, 1), round(it[1].y, 1), round(it[2].x, 1), round(it[2].y, 1)])
        blocks.append({"quad": quad, "grid": grid, "hit": hx(f.get("fill")) == "#ffb9b1"})
    e = ds[163]["rect"]
    geo["manzanas"] = {
        "fondo": r4(ds[72]["rect"]), "bloques": blocks, "elipse": r4(e),
        "puntos": [[round((ds[i]["rect"].x0 + ds[i]["rect"].x1) / 2, 1), round((ds[i]["rect"].y0 + ds[i]["rect"].y1) / 2, 1)] for i in range(169, 181)],
        "exacto": [round((drawings(50)[169]["rect"].x0 + drawings(50)[169]["rect"].x1) / 2, 1), round((drawings(50)[169]["rect"].y0 + drawings(50)[169]["rect"].y1) / 2, 1)],
        "radio_punto": round(ds[169]["rect"].width / 2, 1),
    }

    geo["llamadas"] = {"habitacion": callouts(38), "radio": callouts(51), "torre": callouts(45)}

    (DATA / "geo.json").write_text(json.dumps(geo, ensure_ascii=False, indent=1), encoding="utf-8")
    print("ok:", len(list(IMG.glob("*.webp"))), "webp,", len(list(SVG.glob("*.svg"))), "svg")


if __name__ == "__main__":
    main()
