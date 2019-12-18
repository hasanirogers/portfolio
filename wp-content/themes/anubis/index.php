<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Anubis
 * @since 1.0
 * @version 1.1
 */

wp_head(); ?>
<style>
  :root {
      overflow: auto;
      --color-white: #f8f8f8;
      --color-black: #000;
      --color-primary: #e5c116;
      --color-secondary: #1d76c4;
      --color-background: #05161f;
  }

  body {
      font: 16px 'Ubuntu', sans-serif;
      color: var(--color-white);
      margin: 0;
      overflow: hidden;
      background: var(--color-background);
  }
</style>

<me-app></me-app>

<?php wp_footer();
