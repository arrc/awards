# Awards - online quiz for guessing winners of award ceremonies.

### Idea

Well the idea is simple.  


User will be able to Poll/Guess which nominee
should have won the award in a given category (Best actor, Director, Music)
from his choosen award ceremony (Oscar 2014, Grammy 2016).


This way we will able gague what the general public think about the results
of any given award ceremony.

### Progress
- Web scrapper/Bot to pull data from wikipedia. [Done]
- Sanitize, prepare and save the scrapped data into database. [Done]
- Ceremony list api. [Done]
- Vote api. [Done]

### TODO
- Use Xpath instead of css selectors.
- The web scrapper is very fragile and might not work in the future if wikipedia changes its markup.
- Everything else - ui, quizes, polls etc.
