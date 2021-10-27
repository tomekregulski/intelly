# Intelly - General Overview and Current State

Intelly is a platform being built to help small-to-medium-sized food and beverage brands manage various aspects of their business. The project is divided into separate repos to allow indeoendent development. Below, you can find a list of the specific fton and back ends that make up this project, links to their individual repos, as well as whether or not they have been deployed for public demo.

The public demos should be accessed thought this link: https://gallant-wing-415919.netlify.app/
This will bring you to a login page, which you can enter with the following credentials:

email: guest@intelly.test
password: guest

Once logged in, you will be brough to a dashboard that allows you to navigate the project in its current form. The guest account will have access to all services currently deployed for public demo, with only certain subservices being excluded to prevent any possible interference with sensitive data.

# This Specific Repo - Overview

As mentioned above, Intelly is split into several independent repos in order to facilitate different timelines for development, and thus make it possible to demonstrate those services that have reached an appropriate stage of devlopment.

The repo you are currently visiting is the front end for the Retail Data Dashboard. Its purpose is to store and visualize grocery sales data that is ideally provided weekly by the client. Once submitted, the client can choose their brand (if they work with more than one), as well as the week and region for which they wish to see data.

Once the data is brought in, there are two views: Weekly and Monthly. The weekly screen shows a number of tables and charts that show the revenue and unit sales for that region in that week. The Monthly tab, on the other hand, shows higher-level data points that, at this time, are hard-coded to give a 3-month lookback from the selected time frame (as long as the client has that much history in our database). Ulimately, the client will be given some degree of flexibility to control how far to look back.

One more level of control available to the client is that, if they have more than one category of products being sold in that region, the data will be further split on that level, and they will be able to toggle the view between categories.

Finally, it is worth mentioning that right now this is built around the format of data from Whole Foods Market. As the project grows, we will add models and functionality that is able to accept other data sources.Given the often lack of similarities between data sources, and the usual need for brands to analyze each source separately - priority will be given to developing separate views for each source, and thus the ability for the client to toggle between whichever data sources they have in our system.

# Additional Goals for Development

While much progress has been made with the Retail Data Dashboard, there is a long way to go. The top goals that will shape the next stage of development include:
-Bringing the styling up to a professional standard.
-A more substantial home page - perhaps allowing the ability to pin favorite tables/charts from the Weekly/Monthly views.
-Allowing some form of exporting to facilitate sharing the data figures externally.
-Exploring ways to make this service as mobile-friendly as possible.

# Installation and Contribution

If you wish to test this project locally, you may clone the repo to a directory on your machine. Navigate to the new directory using your terminal, and install all necessary dependencies by running the command 'npm i'.

The app itself should be set up to connect to the deployed server, so at that point, you should be able to start it up by running the command 'npm start' and navigating to localhost:3004 in your browser.

At this time, I am not inviting individual contribution, unless there has been a specific conversation around it. If you come across something in the code that you wish to share, by all means message me and we can speak about it.

# All Repos Related to the Intelly Project

The following is a list of all related projects that have entered some stage of development. It will be updated as work begins on new services.

Authorization - Front End: https://github.com/tomekregulski/intelly-auth-client - Deployed as part of the Public Demo  
Authorization - Back End: https://github.com/tomekregulski/intelly-auth-service - Deployed as part of the Public Demo  
Retail Data Dashboard - Front End: https://github.com/tomekregulski/intelly - Deployed as part of the Public Demo  
Retail Data Dashboard - Back End: https://github.com/tomekregulski/intelly-server - Deployed as part of the Public Demo  
Field Reporting - Front End: https://github.com/tomekregulski/fieldist-rep-web-client - Deployed as part of the Public Demo  
Field Events - Back End: https://github.com/tomekregulski/fieldist-back-end - Deployed as part of the Public Demo  
Field Events Administration - Front End: https://github.com/tomekregulski/fieldist-admin-web-client - Deployed as part of the Public Demo  
Administrative Tasks - Front End: https://github.com/tomekregulski/intelly-admin-tasks-client - Deployed as part of the Public Demo  
Administrative Tasks - Back End: https://github.com/tomekregulski/intelly-admin-task-server - Deployed as part of the Public Demo  
