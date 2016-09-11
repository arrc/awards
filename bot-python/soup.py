import requests
import bs4

def main():
    r = requests.get("https://en.wikipedia.org/wiki/87th_Academy_Awards")
    soup = bs4.BeautifulSoup(r.text)
    print soup.findAll('#mw-content-text > table:nth-child(24)')
    print soup.select("table.wikitable")

if __name__ == "__main__":
    main()
