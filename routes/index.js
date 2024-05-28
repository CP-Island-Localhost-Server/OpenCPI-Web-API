var express = require('express');
var router = express.Router();

// Import handlers
const siteConfiguration = require('../handlers/auth/guest/siteConfiguration');
const register = require('../handlers/auth/guest/register');
const loginByPassword = require('../handlers/auth/guest/loginByPassword');
const loginByToken = require('../handlers/auth/guest/loginByToken');
const refreshAuth = require('../handlers/auth/guest/refreshAuth');
const validate = require('../handlers/auth/guest/validate');
const apiKey = require('../handlers/auth/guest/apiKey');

const mixState = require('../handlers/auth/mix/mixState');
const mixLanguagePreference = require('../handlers/auth/mix/mixLanguagePreference');
const mixSearchName = require('../handlers/auth/mix/mixSearchName');
const mixValidateName = require('../handlers/auth/mix/mixValidateName');
const mixDisplayName = require('../handlers/auth/mix/mixDisplayName');
const mixSession = require('../handlers/auth/mix/mixSession');
const mixSessionDelete = require('../handlers/auth/mix/mixSessionDelete');
const mixFriendship = require('../handlers/auth/mix/mixFriendship');
const mixFriendshipDelete = require('../handlers/auth/mix/mixFriendshipDelete');
const mixFriendshipInvitation = require('../handlers/auth/mix/mixFriendshipInvitation');
const mixFriendshipInvitationDelete = require('../handlers/auth/mix/mixFriendshipInvitationDelete');
const mixModerationText = require('../handlers/auth/mix/mixModerationText');
const mixRegistrationText = require('../handlers/auth/mix/mixRegistrationText');
const mixNotificationsSinceSequence = require('../handlers/auth/mix/mixNotificationsSinceSequence');

const player = require('../handlers/game/player/player');
const profile = require('../handlers/game/player/profile');
const referral = require('../handlers/game/player/referral');
const durable = require('../handlers/game/player/durable');
const outfit = require('../handlers/game/player/outfit');
const getOnlinePlayersBySwids = require('../handlers/game/player/getOnlinePlayersBySwids');
const getOtherPlayerDataByDisplayName = require('../handlers/game/player/getOtherPlayerDataByDisplayName');
const getOtherPlayerDataByDisplayNames = require('../handlers/game/player/getOtherPlayerDataByDisplayNames');
const getOtherPlayerDataBySwid = require('../handlers/game/player/getOtherPlayerDataBySwid');
const getOtherPlayerDataBySwids = require('../handlers/game/player/getOtherPlayerDataBySwids');

const rooms = require('../handlers/game/game/rooms');
const worlds = require('../handlers/game/game/worlds');
const igloo = require('../handlers/game/game/igloo');

const add = require('../handlers/game/reward/add');
const preregistration = require('../handlers/game/reward/preregistration');
const claimServerAdded = require('../handlers/game/reward/claimServerAdded');
const claim = require('../handlers/game/reward/claim');
const room = require('../handlers/game/reward/room');
const claimDailySpin = require('../handlers/game/reward/claimDailySpin');
const claimQuickNotification = require('../handlers/game/reward/claimQuickNotification');
const calculateExchangeAll = require('../handlers/game/reward/calculateExchangeAll');
const exchangeAll = require('../handlers/game/reward/exchangeAll');

const setStatus = require('../handlers/game/quest/setStatus');
const progress = require('../handlers/game/quest/progress');

const getInventory = require('../handlers/game/inventory/getInventory');
const createCustomEquipment = require('../handlers/game/inventory/createCustomEquipment');
const deleteCustomEquipment = require('../handlers/game/inventory/deleteCustomEquipment');

const tutorial = require('../handlers/game/tutorial/tutorial');

const breadcrumb = require('../handlers/game/breadcrumb/breadcrumb');
const removeBreadcrumbs = require('../handlers/game/breadcrumb/removeBreadcrumbs');

const stats = require('../handlers/game/catalog/stats');

const encryptionKey = require('../handlers/game/encryption/encryptionKey');

const verify = require('../handlers/game/chat/verify');

const tube = require('../handlers/game/tube/tube');

const fishingCast = require('../handlers/game/minigame/fishingCast');
const fishingCatch = require('../handlers/game/minigame/fishingCatch');

const purchase = require('../handlers/game/store/purchase');

const consumableGetInventory = require('../handlers/game/consumable/getInventory');
const consumablePurchase = require('../handlers/game/consumable/purchase');
const storePartial = require('../handlers/game/consumable/storePartial');
const use = require('../handlers/game/consumable/use');

const getDecoration = require('../handlers/game/igloo/getDecoration');
const deleteDecoration = require('../handlers/game/igloo/deleteDecoration');
const purchaseDecoration = require('../handlers/game/igloo/purchaseDecoration');
const createLayout = require('../handlers/game/igloo/createLayout');
const deleteLayout = require('../handlers/game/igloo/deleteLayout');
const getLayout = require('../handlers/game/igloo/getLayout');
const updateLayout = require('../handlers/game/igloo/updateLayout');
const updateData = require('../handlers/game/igloo/updateData');
const getActiveLayout = require('../handlers/game/igloo/getActiveLayout');
const populationByZoneIds = require('../handlers/game/igloo/populationByZoneIds');
const popular = require('../handlers/game/igloo/popular');

// Index Route
router.get('/', (req, res) => {
  res.send('<h1>OpenCPI Web API</h1>');
});

// Auth - Guest APIs
router.get('/jgc/v5/client/:clientId/configuration/site', siteConfiguration);
router.post('/jgc/v5/client/guest/register', register);
router.post('/jgc/v5/client/:clientId/guest/login', loginByPassword);
router.post('/jgc/v5/client/guest/refresh-auth/:token', refreshAuth);
router.post('/jgc/v5/client/guest/validate', validate);
router.post('/jgc/v5/client/:clientId/api-key', apiKey);

// Auth - Mix APIs
router.post('/mix/state', mixState);
router.post('/mix/languagePreference', mixLanguagePreference);
router.post('/mix/search/displayname', mixSearchName);
router.post('/mix/displayname/validate/v2', mixValidateName);
router.put('/mix/displayname', mixDisplayName);
router.put('/mix/session/user', mixSession);
router.post('/mix/session/user/delete', mixSessionDelete);
router.put('/mix/friendship', mixFriendship);
router.post('/mix/friendship/delete', mixFriendshipDelete);
router.put('/mix/friendship/invitation', mixFriendshipInvitation);
router.post('/mix/friendship/invitation/delete', mixFriendshipInvitationDelete);
router.put('/mix/moderation/text', mixModerationText);
router.post('/mix/registration/text', mixRegistrationText);
router.post('/mix/notifications/sinceSequence', mixNotificationsSinceSequence);

// Auth - Custom APIs
router.post('/auth/v1/user/login/token', loginByToken);

// Player APIs
router.get('/player/v1/', player);
router.post('/player/v1/profile', profile);
router.put('/player/v1/referral', referral);
router.get('/player/v1/durable/equip/:id', durable);
router.post('/player/v1/outfit', outfit);
router.post('/player/v1/id/online', getOnlinePlayersBySwids);
router.get('/player/v1/name/:name', getOtherPlayerDataByDisplayName);
router.post('/player/v1/names', getOtherPlayerDataByDisplayNames);
router.get('/player/v1/id/:swid', getOtherPlayerDataBySwid);
router.post('/player/v1/id', getOtherPlayerDataBySwids);

// Game APIs
router.get('/game/v1/rooms', rooms);
router.post(
  '/game/v1/worlds/CPI/language/:language/rooms/:room/players',
  worlds
);
router.post('/game/v1/igloos/language/:language/players', igloo);

// Reward APIs
router.put('/reward/v1/', add);
router.get('/reward/v1/preregistration', preregistration);
router.post('/reward/v1/claimServerAdded', claimServerAdded);
router.put('/reward/v1/claim/:id', claim);
router.post('/reward/v1/room', room);
router.post('/reward/v1/claimDailySpin', claimDailySpin);
router.post('/reward/v1/claimQuickNotification', claimQuickNotification);
router.get('/reward/v1/calculateexchangeall', calculateExchangeAll);
router.post('/reward/v1/exchangeall', exchangeAll);

// Quest APIs
router.post('/quest/v1/AAC001Q001LeakyShip', setStatus);
router.post('/quest/v1/AAC001Q002Lava', setStatus);
router.post('/quest/v1/AAC001Q003Hatch', setStatus);
router.post('/quest/v1/AAC001Q004Crabs', setStatus);
router.post('/quest/v1/AAC001Q005Lighthouse', setStatus);
router.post('/quest/v1/AAC002Q001Machine', setStatus);
router.post('/quest/v1/AAC002Q002View', setStatus);
router.post('/quest/v1/AAC002Q003Dots', setStatus);
router.post('/quest/v1/AAC002Q004Icy', setStatus);
router.post('/quest/v1/AAC002Q005Storm', setStatus);
router.post('/quest/v1/AAC002Q006Stolen', setStatus);
router.post('/quest/v1/AAC002Q007Click', setStatus);
router.post('/quest/v1/AAC002Q008Defender', setStatus);
router.post('/quest/v1/AAC002Q009Treasure', setStatus);
router.post('/quest/v1/AAC002Q010Skyberg', setStatus);
router.post('/quest/v1/DJC001Q001Plan', setStatus);
router.post('/quest/v1/DJC001Q002Stars', setStatus);
router.post('/quest/v1/DJC001Q003Meeting', setStatus);
router.post('/quest/v1/DJC001Q004Tea', setStatus);
router.post('/quest/v1/DJC001Q005Concert', setStatus);
router.post('/quest/v1/RHC001Q001TreasureQuest', setStatus);
router.post('/quest/v1/RHC001Q002SwabTheDeck', setStatus);
router.post('/quest/v1/RHC001Q003CursedDummy', setStatus);
router.post('/quest/v1/RHC001Q004ShellRiddles', setStatus);
router.post('/quest/v1/RHC001Q005CureTheCurse', setStatus);
router.post('/quest/v1/RHC001Q006CursedTrail', setStatus);
router.post('/quest/v1/RHC001Q007NavigatorsPuzzle', setStatus);
router.post('/quest/v1/RHC001Q008GoodImpressions', setStatus);
router.post('/quest/v1/RHC001Q009BlackPearl', setStatus);
router.post('/quest/v1/RHC001Q010CaptainsShare', setStatus);
router.post('/quest/v1/RKC001Q001Drop', setStatus);
router.post('/quest/v1/RKC001Q002Fix', setStatus);
router.post('/quest/v1/RKC001Q003Tube', setStatus);
router.post('/quest/v1/RKC001Q004Safety', setStatus);
router.post('/quest/v1/RKC001Q005Delivery', setStatus);
router.post('/quest/v1/RKC002Q001Peak', setStatus);
router.post('/quest/v1/RKC002Q002Detector', setStatus);
router.post('/quest/v1/RKC002Q003Windy', setStatus);
router.post('/quest/v1/RKC002Q004MakeGood', setStatus);
router.post('/quest/v1/RKC002Q005Colder', setStatus);
router.post('/quest/v1/progress', progress);

// Inventory APIs
router.get('/inventory/v1/equipment', getInventory);
router.post('/inventory/v1/equipment', createCustomEquipment);
router.delete('/inventory/v1/equipment/:id', deleteCustomEquipment);

// Tutorial APIs
router.post('/tutorial/v1/tutorial', tutorial);

// Breadcrumb APIs
router.post('/breadcrumb/v1/breadcrumb', breadcrumb);
router.post('/breadcrumb/v1/removebreadcrumbs', removeBreadcrumbs);

// Catalog APIs
router.get('/catalog/v1/clothing/themes/stats', stats);

// Encryption APIs
router.post('/encryption-trusted/v1/encryptionKey', encryptionKey);

// Chat APIs
router.post('/chat/v1/message/verify', verify);

// Tube APIs
router.put('/tube/v1/equip/:id', tube);

// Minigame APIs
router.post('/minigame/v1/fishing/cast', fishingCast);
router.post('/minigame/v1/fishing/catch', fishingCatch);

// Disney Store APIs
router.put('/disneystore/v1/purchase/:type/:count', purchase);

// Consumable APIs
router.get('/consumable/v1/inventory', consumableGetInventory);
router.put('/consumable/v1/purchase', consumablePurchase);
router.get('/consumable/v1/store/partial', storePartial);
router.post('/consumable/v1/use', use);

// Igloo APIs
router.get('/igloo/v1/decorations', getDecoration);
router.delete('/igloo/v1/decorations/:id', deleteDecoration);
router.put('/igloo/v1/decorations/:id', purchaseDecoration);
router.post('/igloo/v1/layout', createLayout);
router.delete('/igloo/v1/layout/:id', deleteLayout);
router.get('/igloo/v1/layout/:id', getLayout);
router.put('/igloo/v1/layout/:id', updateLayout);
router.put('/igloo/v1/layoutdata', updateData);
router.get('/igloo/v1/activelayout', getActiveLayout);
router.post('/igloo/v1/populationbyzoneids', populationByZoneIds);
router.post('/igloo/v1/popular', popular);

module.exports = router;
