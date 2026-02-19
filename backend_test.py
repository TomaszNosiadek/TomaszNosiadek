import requests
import sys
import json
from datetime import datetime

class StalTechAPITester:
    def __init__(self, base_url="https://industrial-cable-sys.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Response: {data}"
            self.log_test("API Root", success, details)
            return success
        except Exception as e:
            self.log_test("API Root", False, str(e))
            return False

    def test_seed_data(self):
        """Test seeding data"""
        try:
            response = requests.post(f"{self.api_url}/seed", timeout=15)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Message: {data.get('message', 'No message')}"
            self.log_test("Seed Data", success, details)
            return success, response.json() if success else {}
        except Exception as e:
            self.log_test("Seed Data", False, str(e))
            return False, {}

    def test_get_testimonials(self):
        """Test getting testimonials"""
        try:
            response = requests.get(f"{self.api_url}/testimonials", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Count: {len(data)} testimonials"
                # Validate structure
                if data and len(data) > 0:
                    first = data[0]
                    required_fields = ['id', 'name', 'company', 'text_pl', 'text_de', 'rating']
                    missing = [f for f in required_fields if f not in first]
                    if missing:
                        success = False
                        details += f", Missing fields: {missing}"
            self.log_test("Get Testimonials", success, details)
            return success, response.json() if success else []
        except Exception as e:
            self.log_test("Get Testimonials", False, str(e))
            return False, []

    def test_get_projects(self):
        """Test getting projects"""
        try:
            response = requests.get(f"{self.api_url}/projects", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Count: {len(data)} projects"
                # Validate structure
                if data and len(data) > 0:
                    first = data[0]
                    required_fields = ['id', 'name', 'location', 'description_pl', 'description_de', 'category', 'year']
                    missing = [f for f in required_fields if f not in first]
                    if missing:
                        success = False
                        details += f", Missing fields: {missing}"
            self.log_test("Get Projects", success, details)
            return success, response.json() if success else []
        except Exception as e:
            self.log_test("Get Projects", False, str(e))
            return False, []

    def test_create_contact_message(self):
        """Test creating contact message"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+48123456789",
            "company": "Test Company",
            "message": "This is a test message from automated testing."
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact", 
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Created ID: {data.get('id', 'No ID')}"
                # Validate response structure
                required_fields = ['id', 'name', 'email', 'message', 'created_at']
                missing = [f for f in required_fields if f not in data]
                if missing:
                    success = False
                    details += f", Missing fields: {missing}"
            self.log_test("Create Contact Message", success, details)
            return success, response.json() if success else {}
        except Exception as e:
            self.log_test("Create Contact Message", False, str(e))
            return False, {}

    def test_get_contact_messages(self):
        """Test getting contact messages"""
        try:
            response = requests.get(f"{self.api_url}/contact", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Count: {len(data)} messages"
            self.log_test("Get Contact Messages", success, details)
            return success, response.json() if success else []
        except Exception as e:
            self.log_test("Get Contact Messages", False, str(e))
            return False, []

    def test_create_testimonial(self):
        """Test creating a new testimonial"""
        test_data = {
            "name": "Test Client",
            "company": "Test Corp",
            "text_pl": "Świetna współpraca z firmą Stal Tech Invest.",
            "text_de": "Ausgezeichnete Zusammenarbeit mit Stal Tech Invest.",
            "rating": 5
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/testimonials",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Created ID: {data.get('id', 'No ID')}"
            self.log_test("Create Testimonial", success, details)
            return success, response.json() if success else {}
        except Exception as e:
            self.log_test("Create Testimonial", False, str(e))
            return False, {}

    def test_create_project(self):
        """Test creating a new project"""
        test_data = {
            "name": "Test Project",
            "location": "Test Location",
            "description_pl": "Testowy projekt montażu tras kablowych.",
            "description_de": "Test-Projekt für Kabeltrassen-Montage.",
            "image_url": "https://example.com/test-image.jpg",
            "category": "test",
            "year": 2024
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/projects",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Created ID: {data.get('id', 'No ID')}"
            self.log_test("Create Project", success, details)
            return success, response.json() if success else {}
        except Exception as e:
            self.log_test("Create Project", False, str(e))
            return False, {}

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Stal Tech Invest API Tests")
        print(f"🌐 Testing API at: {self.api_url}")
        print("=" * 60)

        # Test API availability
        if not self.test_api_root():
            print("❌ API is not accessible. Stopping tests.")
            return False

        # Seed data first
        print("\n📊 Seeding initial data...")
        self.test_seed_data()

        # Test GET endpoints
        print("\n📖 Testing GET endpoints...")
        self.test_get_testimonials()
        self.test_get_projects()
        self.test_get_contact_messages()

        # Test POST endpoints
        print("\n📝 Testing POST endpoints...")
        self.test_create_contact_message()
        self.test_create_testimonial()
        self.test_create_project()

        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check details above.")
            return False

def main():
    tester = StalTechAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    results = {
        "timestamp": datetime.now().isoformat(),
        "total_tests": tester.tests_run,
        "passed_tests": tester.tests_passed,
        "success_rate": f"{(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "0%",
        "test_details": tester.test_results
    }
    
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())