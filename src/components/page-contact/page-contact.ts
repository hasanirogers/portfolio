import { html, css, LitElement } from 'lit';
import { stylesBase, stylesAnimations } from '../../assets/styles';
import { customElement, property, query, queryAll } from 'lit/decorators.js';
import KemetField from 'kemet-ui/dist/components/kemet-field/kemet-field';
import { MeLoader } from '../me-loader/me-loader';

import 'kemet-ui/dist/components/kemet-field/kemet-field';
import 'kemet-ui/dist/components/kemet-input/kemet-input';
import 'kemet-ui/dist/components/kemet-textarea/kemet-textarea';
import 'kemet-ui/dist/components/kemet-button/kemet-button';
import '../me-loader/me-loader';



interface IData {
  message: string;
  code: number;
};

@customElement('page-contact')
export class PageContact extends LitElement {
  static styles = [
    stylesBase,
    stylesAnimations,
    css`
      section {
        font-size: 1rem;
        text-align: center;
        max-height: 64vh;
        overflow: auto;
      }

      @media screen and (min-width: 768px) {
        section {
          max-height: none;
        }
      }

      fieldset {
        width: 80vw;
        border: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        text-align: left;
      }

      @media screen and (min-width: 768px) {
        fieldset {
          width: 64vw;
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr 1.5fr;
        }
      }

      kemet-field:has(kemet-textarea) {
        display: flex;
        flex-direction: column;
        grid-row: 1 / 4;
        grid-column: 2;
      }

      kemet-textarea {
        height: calc(100% - 2rem);
      }

      kemet-textarea::part(textarea) {
        height: 100%;
      }

      kemet-field::part(label) {
        flex: 1;
      }
    `
  ];

  @property()
  formMessage: string = '';

  @query('form')
  form!: HTMLFormElement;

  @query('me-loader')
  loader!: MeLoader;

  @queryAll('kemet-field')
  fields!: KemetField[];

  render() {
    return html`
      <h3>Contact</h3>
      <section class="page">
        <form @submit=${(event: any) => this.sendMessage(event)}>
          <fieldset>
            <kemet-field label="Your Name" message="Your name is required.">
              <kemet-input slot="input" name="user" required></kemet-input>
            </kemet-field>
            <kemet-field label="Your Phone">
              <kemet-input slot="input" name="phone"></kemet-input>
            </kemet-field>
            <kemet-field label="Your Email" message="Your email is required.">
              <kemet-input slot="input" name="email" required></kemet-input>
            </kemet-field>
            <kemet-field label="Leave your message here" message="Please leave a message.">
              <kemet-textarea slot="input" name="message" required></kemet-textarea>
            </kemet-field>
          </fieldset>
          <p><me-loader></me-loader></p>
          <p>${this.formMessage}</p>
          <br />
          <kemet-button variant="rounded">Send</kemet-button>
        </form>
      </section>
    `
  }

  sendMessage(event: any) {
    event.preventDefault();
    this.loader.loading = true;

    setTimeout(async () => {
      const hasError = Array.from(this.fields).some(field => field.status === 'error');

      if (hasError) {
        this.formMessage = "Please fix the errors on the form!"
      } else {
        const form = new FormData(this.form);
        const url = 'https://contact.hasanirogers.me/contact';

        const bodyData = {
          user: form.get('user'),
          phone: form.get('phone'),
          email: form.get('email'),
          message: form.get('message'),
        };

        const config = {
          method: 'POST',
          body: JSON.stringify(bodyData),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json() as IData;

            this.loader.loading = false;

            if (data.message = 'SUCCESS') {
              this.formMessage = 'Your message was sent successfully!'
            } else {
              this.formMessage = 'There was a problem sending your message.'
            }
        } catch (error) {
          console.error(error);
        }
      }
    }, 1);

  }
}
