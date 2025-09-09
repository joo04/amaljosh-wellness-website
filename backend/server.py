from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Amal Josh Wellness API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    phone: str
    health_concern: Optional[str] = None
    health_goals: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ContactFormCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    health_concern: Optional[str] = None
    health_goals: str

class ConsultationRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    preferred_date: Optional[str] = None
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"

class ConsultationRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    preferred_date: Optional[str] = None
    message: Optional[str] = None

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Amal Josh Wellness API - Transforming Lives Naturally"}

@api_router.post("/contact", response_model=ContactForm)
async def create_contact_form(input: ContactFormCreate):
    try:
        contact_dict = input.dict()
        contact_obj = ContactForm(**contact_dict)
        
        # Save to database
        await db.contact_forms.insert_one(contact_obj.dict())
        
        # Send notification email (optional - can be configured later)
        await send_notification_email(contact_obj)
        
        return contact_obj
    except Exception as e:
        logging.error(f"Error creating contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.post("/consultation", response_model=ConsultationRequest)
async def create_consultation_request(input: ConsultationRequestCreate):
    try:
        consultation_dict = input.dict()
        consultation_obj = ConsultationRequest(**consultation_dict)
        
        # Save to database
        await db.consultation_requests.insert_one(consultation_obj.dict())
        
        return consultation_obj
    except Exception as e:
        logging.error(f"Error creating consultation request: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit consultation request")

@api_router.get("/contact-forms", response_model=List[ContactForm])
async def get_contact_forms():
    try:
        forms = await db.contact_forms.find().sort("timestamp", -1).to_list(100)
        return [ContactForm(**form) for form in forms]
    except Exception as e:
        logging.error(f"Error fetching contact forms: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact forms")

@api_router.get("/consultations", response_model=List[ConsultationRequest])
async def get_consultation_requests():
    try:
        consultations = await db.consultation_requests.find().sort("timestamp", -1).to_list(100)
        return [ConsultationRequest(**consultation) for consultation in consultations]
    except Exception as e:
        logging.error(f"Error fetching consultations: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch consultations")

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

async def send_notification_email(contact: ContactForm):
    """Send email notification for new contact form submissions"""
    try:
        # This is a placeholder - you can configure email settings later
        # For now, we'll just log the submission
        logging.info(f"New contact form submission from {contact.full_name} ({contact.email})")
        return True
    except Exception as e:
        logging.error(f"Failed to send notification email: {e}")
        return False

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
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

@app.on_event("startup")
async def startup_db_client():
    logger.info("Starting up Amal Josh Wellness API...")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Shutting down Amal Josh Wellness API...")
