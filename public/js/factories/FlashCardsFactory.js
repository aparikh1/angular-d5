app.factory('FlashCardsFactory', function ($http) {

    return {

        getFlashCards: function (category) {

            var queryParams = {};

            if (category) {
                queryParams.category = category;
            }

            return $http.get('/cards', {
                params: queryParams
            }).then(function (response) {
                return response.data;
            });

        },

        addNewCard: function (card) {
           return $http.post('/cards', card).then(function (response) {
               return response.data;
           });
        },

        // editCard: function (card) {
        //    return $http.put('/updateCard', card)
        //    .then(function (response) {
        //        return response.data;
        //    });
        // },

        deleteCard: function(card) {

            //console.log("card", card);
            var queryParams = {};

            if (card) {
                queryParams.card = card;
            }

            return $http.delete('/cards', {
                params: queryParams
            }).then(function (response) {
                console.log(response);
            });
        },

        loadCard: function(card) {
            var queryParams = {};
            queryParams.card = card;

            return $http.get('/getCardInfo', {
                params: queryParams
            }).then(function (fullCard) {
                //console.log("returning to app", fullCard.data);
                return fullCard.data;
            })
        },

        updateCard: function(fullCard) {
            var queryParams = {};
       
            queryParams.id = fullCard._id;
            queryParams.fullCard = fullCard;

            console.log('query ', queryParams);

            return $http.post('/updateCard', {
                params: queryParams
            }).then(function (card) {
                console.log("returned", card);
                return card;
            })
        }

    };

});
