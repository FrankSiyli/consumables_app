### Without the .env and a listed ip address in MongoDbAtlas you won't see any database data.

### This is a [Next.js](https://nextjs.org/) project 

after cloning:

run: npm i 

run: npm run dev / yarn dev / pnpm dev / bun dev to start the server

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.



### Notes for XFEL devs:

At the moment the AddNewConsumable images are stored as blobs in the MongoDb, that's why a new database entry will be deleted automatically after 2min.

You can adjust the expire time at: ./src/app/Consumables/components/AddNewConsumableView/AddNewConsumableView.js  line41

all APIs are in the pages folder of the central_storage root dir

### Nodemailer

API: sendMailWhenLowAmount.js
used at endpoint: ./src/app/Consumables/components/SingleConsumableView/components/RemoveItems/RemoveItems.js
<br>
When a user remove consumables and the new amount is <= the in db stored value of minimum amount, an email is send to the hallcrew(sender and receiver mail addresses are set in the local .env) 
At the moment it runs with my private gmail address.

#### Task
Replace nodemailer mail logic/ mail address with XFEL system/mail address

### Database

Database model under: ./database/models/Consumable.js

API: addNewConsumable.js
<br>
used at endpoints: ./src/app/Consumables/components/AddNewConsumableView/AddNewConsumableView.js
<br>
<br>
API: fetchConsumables.js
<br>
used at endpoint: ./src/app/Consumables/components/ClickMenuResult/components/ClickMenuItems.js
<br>
<br>
API: deleteConsumables.js
<br>
used at endpoint: ./src/app/Consumables/components/SingleConsumableView/components/SingleConsumableViewInfos/SingleConsumableViewInfos.js
<br>
<br>
API: updateConsumables.js
<br>
used at endpoints: 
./src/app/Consumables/components/SingleConsumableView/components/SingleConsumableViewInfos/SingleConsumableViewInfos.js
<br>
<br>
and
<br>
<br>
./src/app/Consumables/components/SingleConsumableView/components/RemoveItems/RemoveItems.js

#### Task
replace logic with the XFEL used database
<br>
save images as images in a database