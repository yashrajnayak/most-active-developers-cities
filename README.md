# Most Active Developers on GitHub in India

A web application that showcases the most active GitHub developers from major Indian cities including Bengaluru, Delhi NCR, Hyderabad, and Mumbai. The application provides an interactive interface to view developer profiles along with their GitHub statistics.

## Features

- **City-wise Developer Listings**: View developers grouped by major Indian cities
- **City Filtering**: Use URL parameters (e.g., `?city=bengaluru`) to filter developers by city
- **Developer Cards**: Each card displays:
  - Developer's GitHub avatar
  - Name and username
  - Bio
  - Key statistics (Followers and Total Stars)
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Direct GitHub Links**: Quick access to developers' GitHub profiles

## Cities Covered

- Bengaluru
- Delhi NCR (includes Delhi, Noida, Gurgaon, Ghaziabad)
- Hyderabad
- Mumbai (includes Navi Mumbai, Thane)

## Usage

1. **View All Developers**:
   - Simply open the index.html file to view developers from all cities

2. **Filter by City**:
   - Use the following URL parameters to view developers from a specific city:
     - Bengaluru: `?city=bengaluru`
     - Delhi NCR: `?city=delhi`
     - Hyderabad: `?city=hyderabad`
     - Mumbai: `?city=mumbai`

## Data Source

Data is sourced from [github-data.json](https://github.com/yashrajnayak/most-active-developers-india/blob/main/public/data/github-data.json) which originally sources data from [committers.top/india](https://committers.top/india) project by [@ashkulz](https://github.com/ashkulz) and combines it with publicly available GitHub data of users such as avatar, bio, followers and total stars.

## Technical Stack

- HTML5
- CSS3 (with Flexbox and Grid for layouts)
- Vanilla JavaScript (ES6+)