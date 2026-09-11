"""
Script de migración: Puebla la BD con los datos estáticos actuales de cloudinary.js
Ejecutar desde la raíz del proyecto: python -m app.scripts.seed_static_data
"""
import sys
from pathlib import Path

# Asegurar que la raíz del proyecto esté en el path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from app.database.connection import SessionLocal
from app.models.cliente import Cliente
from app.models.cobertura import RutaCobertura
from app.models.nosotros import Nosotros
from app.models.ubicacion import Ubicacion

# ─── CLIENTES (sacados de frontend/src/js/utils/cloudinary.js) ───────────────
CLIENTES_ESTATICOS = [
    {"nombre": "SOBOCE",            "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801154/estaticos/fzx5fxgjdym2qe0grjnl.png"},
    {"nombre": "PIL Andina",         "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801153/estaticos/vkzep870qlxl1gf3p23r.png"},
    {"nombre": "Droguería INTI",     "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801165/estaticos/xprenbar4vysaauoqdo4.png"},
    {"nombre": "COBOCE Cemento",     "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801152/estaticos/fmea5f2ahtjaof3mgita.png"},
    {"nombre": "Corimex",            "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801156/estaticos/exnt9etocdvfnxagnjp5.png"},
    {"nombre": "Autoelec",           "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801150/estaticos/cet0wodqyqlypklzswpb.png"},
    {"nombre": "Belmend",            "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801157/estaticos/rhugd1tmqa8xvmbcp6ru.png"},
    {"nombre": "Dinatex",            "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801162/estaticos/hof4pmrhri81j1gyflsy.png"},
    {"nombre": "Fair Play",          "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801153/estaticos/zlut3vojpjs0yrb7wpxo.png"},
    {"nombre": "Gigantes del Libro", "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801166/estaticos/zhsudmvbcpct29xpji72.png"},
    {"nombre": "Interquímica",       "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801164/estaticos/obkt9apwtzupb0es6gmj.png"},
    {"nombre": "Perno Centro",       "logo_url": "https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801163/estaticos/iukmr1utphllpg68ylzn.png"},
]

# ─── RUTAS DE COBERTURA ──────────────────────────────────────────────────────
RUTAS_ESTATICAS = [
    {
        "region": "asia",
        "region_label_es": "Asia — Pacífico",
        "region_label_en": "Asia — Pacific",
        "titulo_es": "Ruta Asia Pacífico",
        "titulo_en": "Asia Pacific Route",
        "tipo_transporte_es": "Marítimo FCL/LCL",
        "tipo_transporte_en": "Maritime FCL/LCL",
        "tiempo_transito": "28 - 32 Días",
        "puerto_entrada": "Arica (CL) / Callao (PE)",
        "frecuencia_es": "Semanal",
        "frecuencia_en": "Weekly",
        "lat_destino": 35.6762,
        "lng_destino": 139.6503,
        "orden": 1,
    },
    {
        "region": "na",
        "region_label_es": "Norteamérica",
        "region_label_en": "North America",
        "titulo_es": "Ruta Norteamérica",
        "titulo_en": "North America Route",
        "tipo_transporte_es": "Aéreo / Marítimo",
        "tipo_transporte_en": "Air / Maritime",
        "tiempo_transito": "5 - 10 Días",
        "puerto_entrada": "Arica (CL) / Callao (PE)",
        "frecuencia_es": "Diaria",
        "frecuencia_en": "Daily",
        "lat_destino": 40.7128,
        "lng_destino": -74.0060,
        "orden": 2,
    },
    {
        "region": "eu",
        "region_label_es": "Europa",
        "region_label_en": "Europe",
        "titulo_es": "Ruta Europa",
        "titulo_en": "Europe Route",
        "tipo_transporte_es": "Marítimo FCL/LCL",
        "tipo_transporte_en": "Maritime FCL/LCL",
        "tiempo_transito": "30 - 35 Días",
        "puerto_entrada": "Santos (BR) / Callao (PE)",
        "frecuencia_es": "Quincenal",
        "frecuencia_en": "Biweekly",
        "lat_destino": 51.5074,
        "lng_destino": -0.1278,
        "orden": 3,
    },
]

# ─── NOSOTROS ────────────────────────────────────────────────────────────────
NOSOTROS_DATA = {
    "tagline_es": "Más de 20 años de experiencia brindando soluciones logísticas en transporte aéreo, marítimo y terrestre a nivel mundial.",
    "tagline_en": "Over 20 years of experience providing logistics solutions in air, sea and land transport worldwide.",
    "historia_es": (
        "Hace más de 20 años, BOLOG LOGISTICS GROUP SRL nació con una convicción clara: la logística no se trata solo de mover contenedores o paquetes, sino de mover economías, proteger proyectos de vida y construir puentes entre fronteras. En un entorno global cambiante y desafiante, entendimos desde el primer día que detrás de cada importación y exportación hay emprendedores, industrias y familias que confían en que sus insumos y productos llegarán a tiempo.\n\n"
        "Con los años, adaptamos nuestro paso al ritmo acelerado del comercio mundial. Nos expandimos en todas las modalidades —aérea, marítima y terrestre— para garantizar que ninguna distancia fuera infranqueable. Desde la carga consolidada más minuciosa hasta los despachos más complejos a nivel global, hemos dominado las rutas internacionales para que nuestros clientes solo se preocupen por hacer crecer su negocio.\n\n"
        "Lo que verdaderamente nos diferencia no es solo la capacidad técnica, sino la pasión por resolver. En la logística, los imprevistos existen; pero en BOLOG, las excusas no. Nos hemos consolidado como un aliado estratégico que no te abandona en la aduana ni te deja sin respuesta."
    ),
    "historia_en": (
        "Over 20 years ago, BOLOG LOGISTICS GROUP SRL was born with a clear conviction: logistics is not just about moving containers or packages, but about moving economies, protecting life projects and building bridges between borders.\n\n"
        "Over the years, we adapted our pace to the accelerated rhythm of world trade. We expanded in all modalities —air, sea and land— to ensure that no distance was insurmountable.\n\n"
        "What truly differentiates us is not just technical capacity, but the passion for solving problems. In logistics, unforeseen events exist; but at BOLOG, excuses do not."
    ),
    "video_url": "https://res.cloudinary.com/oyusqpnf/video/upload/VIDEO.mp4",
    "mision_es": "Conectar a Bolivia y el mundo mediante servicios de transporte multimodal de excelencia, brindando respaldo absoluto, agilidad operativa y soluciones logísticas reales que potencien a nuestros clientes.",
    "mision_en": "To connect Bolivia and the world through excellence multimodal transport services, providing absolute support, operational agility and real logistics solutions that empower our clients.",
    "vision_es": "Ser el referente líder e innovador en la cadena de suministros de la región, integrando tecnología de vanguardia, alianzas internacionales y un equipo de alta especialización para conectar mercados de forma ágil y sostenible.",
    "vision_en": "To be the leading and innovative benchmark in the regional supply chain, integrating cutting-edge technology, international alliances and a highly specialized team to connect markets in an agile and sustainable way.",
    "valores_es": "Puntualidad, transparencia absoluta y compromiso en cada milla. Respondemos con velocidad, flexibilidad y enfoque práctico para asegurar que cada operación llegue a buen puerto.",
    "valores_en": "Punctuality, absolute transparency and commitment in every mile. We respond with speed, flexibility and a practical approach to ensure every operation reaches its destination.",
    "politicas_es": "Nuestras políticas se fundamentan en el cumplimiento estricto de las normativas internacionales de comercio exterior, priorizando la seguridad, la confidencialidad y la mejora continua en cada etapa de la cadena de suministro.",
    "politicas_en": "Our policies are based on strict compliance with international foreign trade regulations, prioritizing security, confidentiality and continuous improvement at every stage of the supply chain.",
}

# ─── UBICACIONES ─────────────────────────────────────────────────────────────
UBICACIONES_DATA = [
    {
        "nombre_es": "Sede Central",
        "nombre_en": "Headquarters",
        "ciudad_es": "La Paz, Bolivia",
        "ciudad_en": "La Paz, Bolivia",
        "direccion_es": "Calle Capitán Ravelo Nro 267,\nEdificio María Cristina, Piso 3, Oficina 3B\n(Entre calles Gaitia y Montevideo)",
        "direccion_en": "Captain Ravelo St. No. 267,\nMaria Cristina Building, Floor 3, Office 3B\n(Between Gaitia and Montevideo streets)",
        "horarios_es": "Lunes a Viernes, 8:30 - 17:00",
        "horarios_en": "Monday to Friday, 8:30 - 17:00",
        "telefonos": "2 2147305 – 2 2147384 / 78897815",
        "email": "info@blg.com.bo",
        "mapa_link": "https://www.google.com/maps/place/Bolog+Logistics+Group+S.R.L.+-+BLG/@-16.5050963,-68.1281229,17z/data=!3m1!4b1!4m6!3m5!1s0x915f2063b41f0511:0xf461fc012ac88428!8m2!3d-16.5050963!4d-68.1281229!16s%2Fg%2F11dfvjbmsy?hl=es",
        "mapa_url": "https://maps.google.com/maps?width=100%25&height=450&hl=es&q=-16.5050963,-68.1281229&t=&z=17&ie=UTF8&iwloc=B&output=embed",
        "es_sede_central": True,
        "activo": True,
        "orden": 0,
    }
]


def seed_clientes(db):
    count = db.query(Cliente).count()
    if count > 0:
        print(f"  [Clientes] Ya existen {count} clientes. Omitiendo seed.")
        return
    for i, c in enumerate(CLIENTES_ESTATICOS):
        db.add(Cliente(nombre=c["nombre"], logo_url=c["logo_url"], orden=i, activo=1))
    db.commit()
    print(f"  [Clientes] ✓ {len(CLIENTES_ESTATICOS)} clientes insertados.")


def seed_rutas(db):
    count = db.query(RutaCobertura).count()
    if count > 0:
        print(f"  [Cobertura] Ya existen {count} rutas. Omitiendo seed.")
        return
    for r in RUTAS_ESTATICAS:
        db.add(RutaCobertura(**r))
    db.commit()
    print(f"  [Cobertura] ✓ {len(RUTAS_ESTATICAS)} rutas insertadas.")


def seed_nosotros(db):
    existing = db.query(Nosotros).first()
    if existing and existing.historia_es:
        print("  [Nosotros] Ya tiene datos. Omitiendo seed.")
        return
    if existing:
        for k, v in NOSOTROS_DATA.items():
            setattr(existing, k, v)
    else:
        db.add(Nosotros(**NOSOTROS_DATA))
    db.commit()
    print("  [Nosotros] ✓ Datos insertados.")


def seed_ubicaciones(db):
    count = db.query(Ubicacion).count()
    if count > 0:
        print(f"  [Ubicaciones] Ya existen {count} ubicaciones. Omitiendo seed.")
        return
    for u in UBICACIONES_DATA:
        db.add(Ubicacion(**u))
    db.commit()
    print(f"  [Ubicaciones] ✓ {len(UBICACIONES_DATA)} ubicación(es) insertada(s).")


def run():
    print("\n🌱 Iniciando seed de datos estáticos...\n")
    db = SessionLocal()
    try:
        seed_clientes(db)
        seed_rutas(db)
        seed_nosotros(db)
        seed_ubicaciones(db)
        print("\n✅ Seed completado exitosamente.\n")
    except Exception as e:
        db.rollback()
        print(f"\n❌ Error durante seed: {e}\n")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    run()
