# LoyalStars-Node
Node.js implementation of LoyalStars app

### API Routes

#### Public
##### /routes/api/checkins.js
```
GET /api/checkins/:checkinCode/:phone
POST /api/checkins/:checkinCode/:phone
```
##### /routes/api/companies.js
```
GET /api/companies/:companyId
```
##### /routes/api/earnedRewards.js
```
GET /api/earned-rewards/:earnedRewardId/:phone
```
##### /routes/api/locations.js
```
GET /api/loacations/:locationId
GET /api/locations/checkin-code/:checkinCode
```
##### /routes/api/nearby.js
```
GET /api/nearby
```
##### /routes/api/rewards.js
```
GET /api/rewards/:rewardId
```

#### Private
##### /routes/api/companies.js
```
GET /api/companies/
POST /api/companies/
PUT /api/companies/:companyId
DELETE /api/companies/:companyId

GET /api/companies/:companyId/locations
POST /api/companies/:companyId/locations
PUT /api/companies/:companyId/locations/:locationId

GET /api/companies/:companyId/checkins
DELETE /api/companies/:companyId/checkins

GET /api/companies/:companyId/rewards
POST /api/companies/:companyId/rewards
GET /api/companies/:companyId/earned-rewards
```
##### /routes/api/locations.js
```
PUT /api/loacations/:locationId
DELETE /api/loacations/:locationId
GET /api/loacations/:locationId/checkins
GET /api/loacations/:locationId/earned-rewards
```
##### /routes/api/rewards.js
```
PUT /api/rewards/:rewardId
DELETE /api/rewards/:rewardId
```
##### /routes/api/subscriptions.js
```
GET /api/subscriptions/:locationId
POST /api/subscriptions/:locationId
```
