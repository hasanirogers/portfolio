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
  <noscript>
    <?php
      $home = get_posts([
        'name'      => 'home',
        'post_type' => 'page'
      ]);

      $education = get_posts([
        'name'      => 'education',
        'post_type' => 'page'
      ]);

      $history = get_posts([
        'post_type' => 'work_history'
      ]);

      $websites = get_posts([
        'post_type' => 'websites'
      ]);

      $accomplishments = get_posts([
        'name'      => 'accomplishments',
        'post_type' => 'page'
      ]);
    ?>
    <article>
      <h1>Hasani Rogers</h1>
      <h2>Web Developer</h2>
      <?php echo $home[0]->post_content; ?>
      <h3>Education</h3>
      <?php echo $education[0]->post_content; ?>
      <h3>Work History</h3>
      <?php
        foreach ($history as $job) {
          echo $job->post_content;
        }
      ?>
      <h3>Websites</h3>
      <?php
        foreach ($websites as $website) {
          echo '<h4>'. $website->post_title .'</h4>';
          echo $website->post_content;
        }
      ?>
      <h3>Accomplishments</h3>
      <?php echo $accomplishments[0]->post_content; ?>
    </article>
  </noscript>
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
