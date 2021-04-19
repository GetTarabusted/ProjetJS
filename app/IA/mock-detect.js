const detect = () => Promise.resolve([{
        bbox: [
            108.02181085944176,
            16.282024383544922,
            732.4378950893879,
            617.6566505432129
        ],
        class: 'dog',
        score: 0.8761953115463257
    },
    {
        bbox: [
            108.02181085944176,
            16.282024383544922,
            732.4378950893879,
            617.6566505432129
        ],
        class: 'cat',
        score: 0.8761953115463257
    }
]);

console.log('WARNING MOCK LOADED');

module.exports = {detect};