export default {
  video: {
    sidebar: {
      profile: {
        pic: '../img/kevin.jpg',
        head: 'Kevin Hart',
        subhead: 'Film Director, Editor',
        text: 'Philadelphia',
        count: [
          {
            number: 7,
            text: 'Videos',
          },
          {
            number: 54,
            text: 'Followers',
          },
          {
            number: 33,
            text: 'Following',
          },
        ],
        cta: {
          invite: 'Invite to pitch',
          contact: 'Contact',
        },
      },
      more: 'Wanna know more about invite?',
    },
    feature: {
      videoEmbed: `<iframe src="https://player.vimeo.com/video/38762500" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`,
      head: 'Everything Kevin wants 2016',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla iure, exercitationem libero laborum...',
      gallery: {
        subhead: 'MORE VIDEOS FROM HART',
        items: [
          {
            clip: '../img/water.jpg',
            subhead: 'Title of video',
            text: 'Short description of the movie, or whatever this is gonna be.',
          },
          {
            clip: '../img/island.jpg',
            subhead: 'Title of video',
            text: 'Short description of the movie, or whatever this is gonna be.',
          },
          {
            clip: '../img/mountains.jpg',
            subhead: 'Title of video',
            text: 'Short description of the movie, or whatever this is gonna be.',
          },
          {
            clip: '../img/purple.jpg',
            subhead: 'Title of video',
            text: 'Short description of the movie, or whatever this is gonna be.',
          },
          {
            clip: '../img/reflection.jpg',
            subhead: 'Title of video',
            text: 'Short description of the movie, or whatever this is gonna be.',
          },
          {
            clip: '../img/sky.jpg',
            subhead: 'Title of video',
            text: 'Short description of the movie, or whatever this is gonna be.',
          }
        ]
      }
    }
  }
}




//
// .video__layer
//   .video__sidebar
//     .video__profile
//       img(src="../img/kevin.jpg" class="video__pic")
//       h3(class="video__head") Kevin Hart
//       h4(class="video__subhead") Film Director, Editor
//       p(class="video__text") Philadelphia
//     .video__count
//       h3.video__number 7
//         p.video__text Videos
//       h3.video__number 54
//         p.video__text Followers
//       h3.video__number 33
//         p.video__text Following
//     .video__buttons
//       a(href="#" class="video__button") Invite to pitch
//       a(href="#" class="video__button") Contact
//     a(href="#" class="video__more") Wanna know more about invite?
//   .video__feature
//     .responsive-video-embed
//       iframe( src="https://player.vimeo.com/video/38762500?title=0&byline=0&portrait=0", frameborder="0",  webkitallowfullscreen, mozallowfullscreen,  allowfullscreen)
//     h3(class="video__head") Everything Cindy wants 2016
//     p(class="video__text")  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla iure, exercitationem libero laborum...
//     .video__gallery
//       h4(class="video__subhead") MORE VIDEOS FROM HART
//       .video__item
//         img(src="../img/balloon.jpg" class="video__clip")
//         h4(class="video__subhead") Title of video
//         p(class="video__text")  Short description of the movie, or whatever this is gonna be.
