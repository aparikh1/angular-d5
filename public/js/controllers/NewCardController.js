app.controller('NewCardController', function (
    $scope,
    FlashCardsFactory,
    $rootScope
) {

    $scope.submittingCard = false;

    $scope.newCard = {
        question: 'What is ANgluasdlkfj?',
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

});