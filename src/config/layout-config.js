import { webUrl } from './base'
const side_bar = [
    {
        id: 0, 
        name: '我的项目',
        link: {
            id: 'main_item_0',
            className: 'afterRectangular'
        },
        icon: {
            name: 'github',
            className: 'super-crazy-colors fa-fw'
        },
        sub_link: [
            {
                id: 0,
                className: 'subbar',
                name: 'app',
                icon: {
                    name: 'reply',
                    className: 'super-crazy-colors fa-fw'
                },
            },
            {
                id: 1,
                className: 'subbar',
                name: 'sub_item',
                icon: {
                    name: 'reply',
                    className: 'super-crazy-colors fa-fw'
                },
            },
            {
                id: 2,
                className: 'subbar',
                name: 'sub_item',
                icon: {
                    name: 'reply',
                    className: 'super-crazy-colors fa-fw'
                },
            },
        ]
    },
    {
        id: 1, 
        name: '博客分类',
        link: {
            id: 'main_item_1',
            className: 'afterRectangular'
        },
        icon: {
            name: 'th-large',
            className: 'super-crazy-colors fa-fw'
        },
        sub_link: [
            {
                id: 0,
                className: 'subbar',
                name: 'sub_item',
                icon: {
                    name: 'reply',
                    className: 'super-crazy-colors fa-fw'
                },
            },
            {
                id: 1,
                className: 'subbar',
                name: 'sub_item',
                icon: {
                    name: 'reply',
                    className: 'super-crazy-colors fa-fw'
                },
            },
            {
                id: 2,
                className: 'subbar',
                name: 'sub_item',
                icon: {
                    name: 'reply',
                    className: 'super-crazy-colors fa-fw'
                },
            },
        ]
    },
    {
        id: 2, 
        name: '知乎每日一爬',
        href: 'zhihu',
        link: {
            id: 'main_item_2',
            className: ''
        },
        icon: {
            name: 'files-o',
            className: 'super-crazy-colors fa-fw'
        }
    },
    {
        id: 3, 
        name: '小游戏',
        href: 'game',
        link: {
            id: 'main_item_3',
            className: ''
        },
        icon: {
            name: 'gamepad',
            className: 'super-crazy-colors fa-fw'
        }
    }
]



export {
    side_bar
}