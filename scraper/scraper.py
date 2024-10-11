import requests
from bs4 import BeautifulSoup
import time
import json

# Function to get all links from the summary index page
def get_links(base_url):
    page = requests.get(base_url)
    soup = BeautifulSoup(page.content, 'html.parser')
    links = []
    
    # Find all links to substances on the summary index page
    for a_tag in soup.find_all('a', href=True):
        url = a_tag['href']
        if url.startswith('/wiki/') and 'User' not in url and 'Talk' not in url and 'Template' not in url:
            links.append(base_url + url)
    return links

# Function to scrape dosage and duration for both Oral and Smoked sections
def scrape_dosage_and_duration(soup):
    substance_data = {}

    # Debug output to track scraping progress
    print("Scraping Oral and Smoked sections...")

    # Scraping Oral section
    oral_section = soup.find('span', id='Oral')
    if oral_section:
        oral_data = {}
        table = oral_section.find_parent().find_next_sibling()

        if table:
            rows = table.find_all('tr')
            for row in rows:
                cells = row.find_all('td')
                if len(cells) == 2:
                    label = cells[0].get_text(strip=True)
                    value = cells[1].get_text(strip=True)
                    oral_data[label] = value
        
        # Scraping oral duration info
        duration_section = table.find_next_sibling()
        if duration_section:
            duration_rows = duration_section.find_all('tr')
            for row in duration_rows:
                cells = row.find_all('td')
                if len(cells) == 2:
                    label = cells[0].get_text(strip=True)
                    value = cells[1].get_text(strip=True)
                    oral_data[label] = value

        substance_data['oral'] = oral_data
    else:
        print("No Oral section found.")

    # Scraping Smoked section
    smoked_section = soup.find('span', id='Smoked')
    if smoked_section:
        smoked_data = {}
        table = smoked_section.find_parent().find_next_sibling()

        if table:
            rows = table.find_all('tr')
            for row in rows:
                cells = row.find_all('td')
                if len(cells) == 2:
                    label = cells[0].get_text(strip=True)
                    value = cells[1].get_text(strip=True)
                    smoked_data[label] = value

        # Scraping smoked duration info
        duration_section = table.find_next_sibling()
        if duration_section:
            duration_rows = duration_section.find_all('tr')
            for row in duration_rows:
                cells = row.find_all('td')
                if len(cells) == 2:
                    label = cells[0].get_text(strip=True)
                    value = cells[1].get_text(strip=True)
                    smoked_data[label] = value

        substance_data['smoked'] = smoked_data
    else:
        print("No Smoked section found.")

    return substance_data

# Function to scrape data from each drug page
def scrape_substance(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    substance_data = {}
    substance_data['url'] = url

    # Scrape Oral and Smoked sections
    scraped_data = scrape_dosage_and_duration(soup)
    
    # Check if any data was scraped
    if scraped_data:
        substance_data.update(scraped_data)
    else:
        print(f"No dosage or duration data found for {url}")

    return substance_data

# Scrape all drugs by following the links from the summary index
def scrape_all_substances(links):
    all_substance_data = []

    stop_url = "https://psychonautwiki.org/wiki/Summary_index/wiki/Psilocybin_mushrooms/Summary"

    for link in links:
        print(f"Scraping data from {link}")
        try:
            substance_data = scrape_substance(link)
            all_substance_data.append(substance_data)

            # Stop when we reach the specified URL
            if link == stop_url:
                print(f"Reached stop URL: {link}")
                break
        except Exception as e:
            print(f"Error scraping {link}: {e}")
        time.sleep(1)  # Avoid overwhelming the server
    
    return all_substance_data

# Save data as JSON
def save_data(data, filename="scraped_substance_data.json"):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

# Main execution
base_url = 'https://psychonautwiki.org'
start_url = base_url + '/wiki/Summary_index'  # The main summary index page

# Get all links from the Summary Index
all_links = get_links(base_url + '/wiki/Summary_index')

# Scrape data from each substance page
collected_data = scrape_all_substances(all_links)

# Save the scraped data
save_data(collected_data)

print(f"Scraped data saved to scraped_substance_data.json")
