import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from pages.dashboard_page import DashboardPage

@pytest.fixture
def driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless") # Required for CI/CD
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    
    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()), 
        options=options
    )
    yield driver
    driver.quit()

def test_filter_functionality(driver):
    dashboard = DashboardPage(driver)
    dashboard.load()
    
    # 1. Verify initial state (all 3 rows present)
    dashboard.wait_for_data_to_load()
    assert dashboard.get_row_count() == 3
    
    # 2. Apply "Critical" filter
    dashboard.filter_by_critical()
    
    # 3. Prove we can handle the async loading
    dashboard.wait_for_data_to_load()
    
    # 4. Assert the UI updated correctly
    assert dashboard.get_row_count() == 1
    print("Test Passed: Filter accurately updated the UI data.")