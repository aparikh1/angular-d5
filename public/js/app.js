var app = angular.module('FlashCards', ['ui.router']);


app.config(function ($stateProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

    $stateProvider.state('form', {
        url: '/form',
        templateUrl: '/templates/form.html',
        controller: 'FormController'
    })

    $stateProvider.state('stats', {
    	url: '/stats',
    	templateUrl: 'templates/stats.html',
    	controller: 'StatsController'
    })

    $stateProvider.state('home', {
    	url: '/',
    	templateUrl: 'templates/home.html',
    	controller: 'HomeController'
    })

    $stateProvider.state('manageCard', {
    	url: '/manageCard/:card',
    	templateUrl: 'templates/manageCard.html',
    	controller: 'ManageCardController'
    })

    $stateProvider.state('manageCard.edit', {
    	url: '/edit',
    	templateUrl: 'templates/edit.html',
    	controller: 'EditCardController'
    })

    $stateProvider.state('manageCard.delete', {
    	url: '/delete',
    	templateUrl: 'templates/delete.html',
    	controller: 'DeleteCardController'
    })

});


app.controller('FormController', function ($scope, FlashCardsFactory, $rootScope) {
	console.log('test', $scope.flashCards);

    $scope.submittingCard = false;

    $scope.newCard = {
        question: '',
        category: 'Angular',
        answers: [
            { text: 'Okay', correct: false },
            { text: 'Never', correct: true },
            { text: 'Fill out the form again', correct: false }
        ]
    };

    $scope.submitNewCard = function (card) {
        $scope.submittingCard = true;
        FlashCardsFactory.addNewCard(card).then(function (newCard) {
            $rootScope.$broadcast('newCardAdded', newCard);
            $scope.submittingCard = false;
            $scope.newCard = {
                question: null,
                category: null,
                answers: [
                    { text: null, correct: false },
                    { text: null, correct: false },
                    { text: null, correct: false }
                ]
            };
        });
    };
})


app.controller('HomeController', function ($scope, FlashCardsFactory) {
	$scope.flashCards = [];

    $scope.cardsLoading = true;

    $scope.categories = [
        'MongoDB',
        'Express',
        'Angular',
        'Node'
    ];

    $scope.chosenCategory = 'All';

    $scope.getAllCards = function () {
        $scope.chosenCategory = 'All';
        $scope.cardsLoading = true;
        FlashCardsFactory.getFlashCards().then(function (cards) {
            $scope.cardsLoading = false;
            $scope.flashCards = cards;
        });
    };

    $scope.getCategoryCards = function (category) {
        $scope.chosenCategory = category;
        $scope.cardsLoading = true;
        FlashCardsFactory.getFlashCards(category).then(function (cards) {
            $scope.cardsLoading = false;
            $scope.flashCards = cards;
        });
    };

    $scope.getAllCards();
    console.log($scope.getAllCards());

    $scope.$on('newCardAdded', function (event, card) {
        $scope.flashCards.unshift(card);
    });
})


app.controller('ManageCardController', function ($scope, FlashCardsFactory, $stateParams) {
})


app.controller('EditCardController', function ($state, $scope, FlashCardsFactory, $stateParams, $rootScope) {

	$scope.card = $stateParams.card;
	$scope.loadCard = FlashCardsFactory.loadCard;

	$scope.submittingCard = false;

	FlashCardsFactory.loadCard($scope.card)
	.then(function (fullCard) {
		$scope.newCard = fullCard;
	});

    $scope.update = function (fullCard) {
        $scope.submittingCard = true;

        console.log('testcard', fullCard);

        FlashCardsFactory.updateCard(fullCard)
        .then(function (updatedCard) {
        	$state.go('home')
        });
    };

})


app.controller('DeleteCardController', function ($state, $scope, FlashCardsFactory, $stateParams) {

	$scope.card = $stateParams.card;

	$scope.goBack = function () {
		$state.go('manageCard')
	}

	$scope.deleteCard = function (card) {
		FlashCardsFactory.deleteCard(card);
		$state.go('home');

	}

})


