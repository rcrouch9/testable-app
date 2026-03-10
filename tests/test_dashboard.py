import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from pages.dashboard import DashboardPage

@pytest.fixture
def driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless") # Required for CI/CD
    options.add_argument("--window-size=1920,1080")
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
    
    # 1. Verify initial state
    dashboard.wait_for_data_to_load()
    initial_count = dashboard.get_row_count()
    assert initial_count == 3
    
    # 2. Apply "Critical" filter
    dashboard.filter_by_critical()
    
    # 3. Wait for synchronization
    # We pass the initial_count so Selenium knows to wait for a change
    dashboard.wait_for_data_to_load(current_count=initial_count)

    # 4. Assert the UI updated correctly
    assert dashboard.get_row_count() == 1