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

<body>
  <me-app></me-app>
  <me-footer>
    <?php
      $footer_menu_args = array(
        'container_class'   => 'footer-menu',
        'container'         => 'nav',
        'items_wrap'           => '%3$s',
        'theme_location'       => 'footer-menu',
      );

      wp_nav_menu($footer_menu_args);
      get_template_part('inc/template-parts/social');
    ?>
  </me-footer>
</body>

<?php wp_footer();
