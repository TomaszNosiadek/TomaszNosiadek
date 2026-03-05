from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    text_pl: str
    text_de: str
    rating: int = Field(ge=1, le=5)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TestimonialCreate(BaseModel):
    name: str
    company: str
    text_pl: str
    text_de: str
    rating: int = Field(ge=1, le=5)

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    description_pl: str
    description_de: str
    image_url: str
    category: str
    year: int
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProjectCreate(BaseModel):
    name: str
    location: str
    description_pl: str
    description_de: str
    image_url: str
    category: str
    year: int

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    message: str

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Stal Tech Invest API"}

# Testimonials
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(100)
    for t in testimonials:
        if isinstance(t.get('created_at'), str):
            t['created_at'] = datetime.fromisoformat(t['created_at'])
    return testimonials

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(input: TestimonialCreate):
    testimonial = Testimonial(**input.model_dump())
    doc = testimonial.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.testimonials.insert_one(doc)
    return testimonial

# Projects
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find({}, {"_id": 0}).to_list(100)
    for p in projects:
        if isinstance(p.get('created_at'), str):
            p['created_at'] = datetime.fromisoformat(p['created_at'])
    return projects

@api_router.post("/projects", response_model=Project)
async def create_project(input: ProjectCreate):
    project = Project(**input.model_dump())
    doc = project.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.projects.insert_one(doc)
    return project

# Contact Messages
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    message = ContactMessage(**input.model_dump())
    doc = message.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return message

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(100)
    for m in messages:
        if isinstance(m.get('created_at'), str):
            m['created_at'] = datetime.fromisoformat(m['created_at'])
    return messages

# Seed data endpoint
@api_router.post("/seed")
async def seed_data():
    # Check if already seeded
    existing = await db.testimonials.count_documents({})
    if existing > 0:
        return {"message": "Data already seeded"}
    
    # Seed testimonials
    testimonials = [
        {
            "id": str(uuid.uuid4()),
            "name": "Hans Müller",
            "company": "Mercedes-Benz Düsseldorf",
            "text_pl": "Profesjonalna realizacja projektu. Zespół Stal Tech Invest wykazał się dużym doświadczeniem i terminowością. Polecam współpracę.",
            "text_de": "Professionelle Projektausführung. Das Team von Stal Tech Invest hat große Erfahrung und Pünktlichkeit bewiesen. Ich empfehle die Zusammenarbeit.",
            "rating": 5,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Stefan Weber",
            "company": "Amazon Logistics",
            "text_pl": "Doskonała jakość montażu tras kablowych. Terminowa realizacja i świetna komunikacja przez cały projekt.",
            "text_de": "Hervorragende Qualität bei der Montage von Kabeltrassen. Termingerechte Ausführung und ausgezeichnete Kommunikation während des gesamten Projekts.",
            "rating": 5,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Klaus Schmidt",
            "company": "Ford Köln",
            "text_pl": "Bardzo dobra współpraca. Fachowy zespół i elastyczne podejście do realizacji. Na pewno będziemy kontynuować współpracę.",
            "text_de": "Sehr gute Zusammenarbeit. Fachkundiges Team und flexible Herangehensweise bei der Umsetzung. Wir werden die Zusammenarbeit auf jeden Fall fortsetzen.",
            "rating": 5,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    # Seed projects with real company photos
    projects = [
        {
            "id": str(uuid.uuid4()),
            "name": "",
            "location": "Niemcy",
            "description_pl": "Kompleksowy montaż systemów tras kablowych w hali produkcyjnej. Profesjonalne wykonanie z użyciem systemów NIEDAX.",
            "description_de": "Umfassende Montage von Kabeltrassen-Systemen in einer Produktionshalle. Professionelle Ausführung mit NIEDAX-Systemen.",
            "image_url": "https://customer-assets.emergentagent.com/job_industrial-cable-sys/artifacts/6skvztu5_1.jpeg",
            "category": "industrial",
            "year": 2024,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "",
            "location": "Niemcy",
            "description_pl": "Montaż tras kablowych na wysokości z użyciem podestów ruchomych. Prace wykonane zgodnie z najwyższymi standardami bezpieczeństwa.",
            "description_de": "Montage von Kabeltrassen in der Höhe mit Hubarbeitsbühnen. Arbeiten nach höchsten Sicherheitsstandards ausgeführt.",
            "image_url": "https://customer-assets.emergentagent.com/job_industrial-cable-sys/artifacts/n45wedes_2.jpeg",
            "category": "industrial",
            "year": 2024,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "",
            "location": "Niemcy",
            "description_pl": "Realizacja instalacji tras kablowych w nowoczesnym centrum logistycznym. Praca w systemie ciągłym.",
            "description_de": "Realisierung der Kabeltrassen-Installation im modernen Logistikzentrum. Arbeiten im Durchlaufbetrieb.",
            "image_url": "https://customer-assets.emergentagent.com/job_industrial-cable-sys/artifacts/eg70opm5_3.jpeg",
            "category": "logistics",
            "year": 2024,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "",
            "location": "Niemcy",
            "description_pl": "Montaż systemów drabinkowych i korytków kablowych. Wysoka precyzja i estetyka wykonania.",
            "description_de": "Montage von Kabelleiter- und Kabelrinnen-Systemen. Hohe Präzision und Ästhetik der Ausführung.",
            "image_url": "https://customer-assets.emergentagent.com/job_industrial-cable-sys/artifacts/mctqe4gd_4.jpeg",
            "category": "logistics",
            "year": 2024,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "",
            "location": "Niemcy",
            "description_pl": "Kompleksowa instalacja tras kablowych w zakładzie produkcyjnym. Projekt realizowany przy ciągłej produkcji.",
            "description_de": "Umfassende Installation von Kabeltrassen im Produktionswerk. Projekt bei laufender Produktion durchgeführt.",
            "image_url": "https://customer-assets.emergentagent.com/job_industrial-cable-sys/artifacts/91jwk05a_5.jpeg",
            "category": "industrial",
            "year": 2024,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "",
            "location": "Düsseldorf, Niemcy",
            "description_pl": "Kompleksowy montaż systemów tras kablowych w zakładzie produkcyjnym Mercedes-Benz. Ponad 5000 metrów tras kablowych.",
            "description_de": "Umfassende Installation von Kabeltrassen-Systemen im Mercedes-Benz Produktionswerk. Über 5000 Meter Kabeltrassen.",
            "image_url": "https://customer-assets.emergentagent.com/job_industrial-cable-sys/artifacts/6skvztu5_1.jpeg",
            "category": "automotive",
            "year": 2023,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "",
            "location": "Köln, Niemcy",
            "description_pl": "Realizacja instalacji tras kablowych w centrum logistycznym Amazon. Praca w systemie ciągłym.",
            "description_de": "Realisierung der Kabeltrassen-Installation im Amazon Logistikzentrum. Arbeiten im Durchlaufbetrieb.",
            "image_url": "https://customer-assets.emergentagent.com/job_industrial-cable-sys/artifacts/eg70opm5_3.jpeg",
            "category": "logistics",
            "year": 2023,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Ford Köln",
            "location": "",
            "description_pl": "Instalacja tras kablowych w zakładzie produkcyjnym Ford. Projekt realizowany przy ciągłej produkcji.",
            "description_de": "Installation von Kabeltrassen im Ford Produktionswerk. Projekt bei laufender Produktion durchgeführt.",
            "image_url": "https://customer-assets.emergentagent.com/job_industrial-cable-sys/artifacts/n45wedes_2.jpeg",
            "category": "automotive",
            "year": 2022,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "",
            "location": "Niemcy",
            "description_pl": "Montaż tras kablowych dla producenta mebli kuchennych Nobilia. Wysoka precyzja i czystość pracy.",
            "description_de": "Montage von Kabeltrassen für den Küchenmöbelhersteller Nobilia. Höchste Präzision und Sauberkeit.",
            "image_url": "https://customer-assets.emergentagent.com/job_industrial-cable-sys/artifacts/mctqe4gd_4.jpeg",
            "category": "industrial",
            "year": 2022,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "",
            "location": "Düsseldorf, Niemcy",
            "description_pl": "Montaż systemów tras kablowych w halach wystawienniczych. Wysoka precyzja i estetyka wykonania.",
            "description_de": "Montage von Kabeltrassen-Systemen in Ausstellungshallen. Hohe Präzision und Ästhetik der Ausführung.",
            "image_url": "https://customer-assets.emergentagent.com/job_industrial-cable-sys/artifacts/91jwk05a_5.jpeg",
            "category": "commercial",
            "year": 2021,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    for t in testimonials:
        await db.testimonials.insert_one(t)
    
    for p in projects:
        await db.projects.insert_one(p)
    
    return {"message": "Data seeded successfully", "testimonials": len(testimonials), "projects": len(projects)}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
