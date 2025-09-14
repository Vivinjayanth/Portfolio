#!/usr/bin/env python3

import sys
import os
from pathlib import Path
import json
try:
    import pdf2pic
    from pdf2pic import convert_from_path
    PDF_TO_IMAGE_AVAILABLE = True
except ImportError:
    PDF_TO_IMAGE_AVAILABLE = False

try:
    import pdfplumber
    PDFPLUMBER_AVAILABLE = True
except ImportError:
    PDFPLUMBER_AVAILABLE = False

try:
    import fitz
    PYMUPDF_AVAILABLE = True
except ImportError:
    PYMUPDF_AVAILABLE = False

def check_dependencies():
    missing = []
    if not PDF_TO_IMAGE_AVAILABLE:
        missing.append("pdf2pic")
    if not PDFPLUMBER_AVAILABLE:
        missing.append("pdfplumber")
    if not PYMUPDF_AVAILABLE:
        missing.append("PyMuPDF")
    
    if missing:
        print("Missing dependencies:", ", ".join(missing))
        print("Install with: pip install", " ".join(missing))
        return False
    return True

def extract_text_pdfplumber(pdf_path):
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text() or ""
        return text
    except Exception as e:
        print(f"Error extracting text with pdfplumber: {e}")
        return None

def extract_text_pymupdf(pdf_path):
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page_num in range(doc.page_count):
            page = doc[page_num]
            text += page.get_text()
        doc.close()
        return text
    except Exception as e:
        print(f"Error extracting text with PyMuPDF: {e}")
        return None

def convert_to_images(pdf_path, output_dir="resume_images"):
    try:
        if not PDF_TO_IMAGE_AVAILABLE:
            print("pdf2pic not available for image conversion")
            return False
        
        Path(output_dir).mkdir(exist_ok=True)
        images = convert_from_path(pdf_path, output_folder=output_dir, fmt='png')
        print(f"Converted {len(images)} pages to images in {output_dir}/")
        return True
    except Exception as e:
        print(f"Error converting to images: {e}")
        return False

def analyze_resume(pdf_path):
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
        return
    
    print(f"Analyzing resume: {pdf_path}")
    print("-" * 50)
    
    text = None
    if PDFPLUMBER_AVAILABLE:
        text = extract_text_pdfplumber(pdf_path)
    elif PYMUPDF_AVAILABLE:
        text = extract_text_pymupdf(pdf_path)
    
    if text:
        word_count = len(text.split())
        char_count = len(text)
        lines = text.split('\n')
        non_empty_lines = [line for line in lines if line.strip()]
        
        print(f"Text extraction successful!")
        print(f"Word count: {word_count}")
        print(f"Character count: {char_count}")
        print(f"Lines: {len(non_empty_lines)}")
        print("\nFirst 300 characters:")
        print("-" * 30)
        print(text[:300])
        print("-" * 30)
        
        potential_emails = [word for word in text.split() if '@' in word]
        potential_phones = [word for word in text.split() if any(char.isdigit() for char in word) and len(word) > 8]
        
        if potential_emails:
            print(f"\nPotential emails found: {potential_emails}")
        if potential_phones:
            print(f"Potential phone numbers found: {potential_phones[:3]}")
        
        skills_keywords = ['Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js', 'AWS', 'Docker', 'SQL', 'Machine Learning', 'AI', 'Data Science']
        found_skills = [skill for skill in skills_keywords if skill.lower() in text.lower()]
        if found_skills:
            print(f"Technical skills detected: {found_skills}")
    else:
        print("Failed to extract text from PDF")
    
    convert_to_images(pdf_path)

def main():
    if len(sys.argv) != 2:
        print("Usage: python parse_resume.py <path_to_pdf>")
        print("Example: python parse_resume.py public/resume.pdf")
        sys.exit(1)
    
    if not check_dependencies():
        print("\nTo install all dependencies:")
        print("pip install -r requirements.txt")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    analyze_resume(pdf_path)

if __name__ == "__main__":
    main()
