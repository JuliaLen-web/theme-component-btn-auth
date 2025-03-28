import { withPluginApi } from "discourse/lib/plugin-api";

const PLUGIN_ID = "discourse-anon-button";

export default {
  name: PLUGIN_ID,
  initialize() {
    withPluginApi("0.8", api => {

      api.onPageChange((url, title) => {

        function addButton() {
          if (document.querySelector('.btn-nextNew-wrapper') || !document.querySelector(".container.posts")) return false;

          const buttonAuthWrapper = document.createElement("div");
          buttonAuthWrapper.classList.add("btn-nextNew-wrapper");

          const buttonAuth = document.createElement("a");
          buttonAuth.setAttribute('href', '#');
          buttonAuth.classList.add("btn-nextNew");

          const buttonText = document.createTextNode(`К следующей новости`);
          buttonAuth.appendChild(buttonText);

          buttonAuthWrapper.appendChild(buttonAuth);
          const afterAllPosts = document.querySelector(".container.posts");
          // const afterAllPosts = document.querySelector(".anon .embedded .container.posts");
          afterAllPosts.after(buttonAuthWrapper);
        }

        addButton();

      });
    });
  }
};
