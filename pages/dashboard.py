from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class DashboardPage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "http://localhost:3000"
        
        # Locators using the data-testids we added earlier
        self.TITLE = (By.CSS_SELECTOR, "[data-testid='dashboard-title']")
        self.FILTER_CRITICAL = (By.CSS_SELECTOR, "[data-testid='filter-btn-critical']")
        self.LOADING_SPINNER = (By.CSS_SELECTOR, "[data-testid='loading-spinner']")
        self.DATA_ROWS = (By.CSS_SELECTOR, "[data-testid^='data-row-']") # Starts with

    def load(self):
        self.driver.get(self.url)

    def filter_by_critical(self):
        self.driver.find_element(*self.FILTER_CRITICAL).click()

    def wait_for_data_to_load(self):
        # Wait for the spinner to appear, then disappear
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.invisibility_of_element_locator(self.LOADING_SPINNER))

    def get_row_count(self):
        return len(self.driver.find_elements(*self.DATA_ROWS))