# Comedy Shows Database

This is a database of local comedy shows, open mics, comedians, and venues. 

## Shows and Open Mics

The comedy shows and open mics will display the address, the host, the start and end time, the cost, the day of week, the frequency, the submission link, and the ticket link.

## Comedians

The comedians model will list comedians, and display their websites, headshots, and video clips, if applicable. It will also link to a list array of shows they host.

## Venues

The venues model will list the venues, along with their address and seating capacity. It will also display a list array of the shows that are hosted there.

## Relationships

Shows will have a many to many relationship with comedians. Each show will have one or more comedian hosts, and each comedian can host zero, one, or many shows.

Shows will have a many to one relationship with venues. Each is run at one venue, but each venue can run one or many shows.

## User Stories (As A User I Want To) and Minimum Viable Product (MVP)

1. AAUIWT view all comedy shows and related data.
4. AAUIWT view all comedians and related data.
5. AAUIWT view all venues and related data.
6. AAUIWT use backend ThunderClient to create, update, or delete mics, shows, comedians, and venues.

## Stretch Goals

1. AAUIWT use frontend HTML to create, update, or delete mics, shows, comedians, and venues.
7. AAUIWT add headshot links or video links from existing webpages to a comedian profile.
2. AAUIWT filter by day of week.
3. AAUIWT filter by open mic or show.
8. Click on a show, mic, comedian, or venue and see an expaned page with extra details.
1. Have the show frequency calculate and display the date of the next occurence of the show. 

## ERD 

![three relationship databases for comedians, shows, venues](assets/ERD.png)

## Mockups 

![event homepage mockup](assets/event-mockup.png)

![comedian database mockup](assets/comedian-mockup.png)
