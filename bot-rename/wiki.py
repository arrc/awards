import requests
baseurl = 'http://en.wikipedia.org/w/api.php'
my_atts = {}
my_atts['action'] = 'query'  # action=query
my_atts['prop'] = 'info'     # prop=info
my_atts['format'] = 'json'   # format=json
my_atts['titles'] = 'Stanford University'

resp = requests.get(baseurl, params = my_atts)
data = resp.json()
print resp.url
print data
