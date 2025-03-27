import { withPluginApi } from "discourse/lib/plugin-api";

const PLUGIN_ID = "discourse-anon-button";

export default {
  name: PLUGIN_ID,
  initialize() {
    withPluginApi("0.8", api => {

      api.onPageChange((url, title) => {

        function addButton() {

          if (document.querySelector('.btn-auth-wrapper') || !document.querySelector(".container.posts")) return false;

          const buttonAuthWrapper = document.createElement("div");
          buttonAuthWrapper.classList.add("btn-auth-wrapper");
          // buttonAuthWrapper.classList.add("post-action-menu__reply");
          // buttonAuthWrapper.classList.add("reply");


          const buttonAuth = document.createElement("a");
          // buttonAuth.setAttribute('href', 'https://brokensun.com/auth/oauth2_basic/?login=1&language=ru&redirect_uri=%2Fru%2Fnews%2Fnovye-predmety-uzhe-v-igre-test%2F26950%2F');
          buttonAuth.classList.add("btn-auth");
          // buttonAuth.setAttribute('onclick',"elclick('button_click','login');")

          const buttonText = document.createTextNode(`Комментировать`);
          buttonAuth.appendChild(buttonText);
          // const afterAllPosts = document.querySelector(".anon .embedded .container.posts");

          buttonAuth.addEventListener('click', ()=> {
            const { REPLY } = require('discourse/models/composer').default;

            const composer = Discourse.__container__.lookup('controller:composer');

            setTimeout(function() {
              const topic = Discourse.__container__.lookup("controller:topic").get("model");
              if (topic) {
                composer.open({
                  action: REPLY,
                  draftKey: topic.draft_key,
                  draftSequence: topic.draft_sequence,
                  topic,
                });
              }
            }, 0)
          })

          buttonAuthWrapper.appendChild(buttonAuth);
          const afterAllPosts = document.querySelector(".container.posts");
          afterAllPosts.after(buttonAuthWrapper);
        }

        addButton();

      });
    });
  }
};
