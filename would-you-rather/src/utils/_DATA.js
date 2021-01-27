let users = {
    sarahedo: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: 'https://media.discordapp.net/attachments/560625691985575947/802008740160077864/avatar.webp',
        answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionTwo',
            "am8ehyc8byjqgar0jgpub9": 'optionTwo',
            "loxhs1bqm25b708cmbf3g": 'optionTwo'
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    tylermcginnis: {
        id: 'tylermcginnis',
        name: 'Tyler McGinnis',
        avatarURL: 'https://images-ext-2.discordapp.net/external/ZHy6j3d-FYC3u48t_F9syEE0DFh3pewPFhsxm1wSkhU/%3Fauto%3Dwebp%26s%3D38648ef0dc2c3fce76d5e1d8639234d8da0152b2/https/external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png',
        answers: {
            "vthrdm985a262al8qx3do": 'optionOne',
            "xj352vofupe1dqz9emx13r": 'optionTwo',
        },
        questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    johndoe: {
        id: 'johndoe',
        name: 'John Doe',
        avatarURL: 'https://cdn.discordapp.com/attachments/560625691985575947/804029749047459861/unknown.png',
        answers: {
            "xj352vofupe1dqz9emx13r": 'optionOne',
            "vthrdm985a262al8qx3do": 'optionTwo',
            "6ni6ok3ym7mf1p33lnez": 'optionTwo'
        },
        questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    }
}
  
let questions = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        hint: 'this is a memory related question',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
            votes: ['sarahedo'],
            text: 'have horrible short term memory',
        },
        optionTwo: {
            votes: [],
            text: 'have horrible long term memory'
        }
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        hint: 'super...',
        author: 'johndoe',
        timestamp: 1468479767190,
        optionOne: {
            votes: [],
            text: 'become a superhero',
        },
        optionTwo: {
            votes: ['johndoe', 'sarahedo'],
            text: 'become a supervillain'
        }
    },
    "am8ehyc8byjqgar0jgpub9": {
        id: 'am8ehyc8byjqgar0jgpub9',
        hint: 'tele...',
        author: 'sarahedo',
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: 'be telekinetic',
        },
        optionTwo: {
            votes: ['sarahedo'],
            text: 'be telepathic'
        }
    },
    "loxhs1bqm25b708cmbf3g": {
        id: 'loxhs1bqm25b708cmbf3g',
        hint: 'developer',
        author: 'tylermcginnis',
        timestamp: 1482579767190,
        optionOne: {
            votes: [],
            text: 'be a front-end developer',
        },
        optionTwo: {
            votes: ['sarahedo'],
            text: 'be a back-end developer'
        }
    },
    "vthrdm985a262al8qx3do": {
        id: 'vthrdm985a262al8qx3do',
        hint: '$$',
        author: 'tylermcginnis',
        timestamp: 1611237479000,
        optionOne: {
            votes: ['tylermcginnis'],
            text: 'find $50 yourself',
        },
        optionTwo: {
            votes: ['johndoe'],
            text: 'have your best friend find $500'
        }
    },
    "xj352vofupe1dqz9emx13r": {
        id: 'xj352vofupe1dqz9emx13r',
        hint: 'code',
        author: 'johndoe',
        timestamp: 1493579767190,
        optionOne: {
            votes: ['johndoe'],
            text: 'write JavaScript',
        },
        optionTwo: {
            votes: ['tylermcginnis'],
            text: 'write Swift'
        }
    },
}

    function generateUID () {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
  
    export function _getUsers () {
        return new Promise((res, rej) => {
            setTimeout(() => res({...users}), 1000)
        })
    }
  
    export function _getQuestions () {
        return new Promise((res, rej) => {
            setTimeout(() => res({...questions}), 1000)
        })
    }
  
    function formatQuestion ({ optionOneText, optionTwoText, hint, author }) {
        return {
            id: generateUID(),
            timestamp: Date.now(),
            author,
            hint,
            optionOne: {
                votes: [],
                text: optionOneText,
            },
            optionTwo: {
                votes: [],
                text: optionTwoText,
            }
        }
    }

    export function _saveUser (user) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                users = {
                    ...users, ...user
                }

                res(user);
            }, 1000);
        })
    }
  
    export function _saveQuestion (question) {
        return new Promise((res, rej) => {
            const authedUser = question.author;
            const formattedQuestion = formatQuestion(question);
        
            setTimeout(() => {
                questions = {
                    ...questions,
                    [formattedQuestion.id]: formattedQuestion
                }
                
                users = {
                    ...users,
                    [authedUser]: {
                        ...users[authedUser],
                        questions: users[authedUser].questions.concat([formattedQuestion.id])
                    }
                }
        
                res(formattedQuestion)
            }, 1000)
        })
    }
  
    export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                users = {
                    ...users,
                    [authedUser]: {
                        ...users[authedUser],
                        answers: {
                            ...users[authedUser].answers,
                            [qid]: answer
                        }
                    }
                }
        
                questions = {
                    ...questions,
                    [qid]: {
                        ...questions[qid],
                        [answer]: {
                            ...questions[qid][answer],
                            votes: questions[qid][answer].votes.concat([authedUser])
                        }
                    }
                }

                res({ userId: authedUser, questionId: qid, answer })
            }, 500)
        })
    }