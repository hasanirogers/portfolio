<?php
/**
 * @package WordPress
 * @subpackage Anubis
 * @since 1.0
 */


// includes
include_once('inc/taxonomies/skills.php');
include_once('inc/post-types/websites.php');
include_once('inc/post-types/work-history.php');


// disable wp-embed
function disable_wp_embed(){
    wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'disable_wp_embed' );

// disable admin bar
add_filter('show_admin_bar', '__return_false');

// disable emojis
function disable_emojis() {
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
  add_filter( 'wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2 );
}
add_action( 'init', 'disable_emojis' );


// meta tags
function add_meta_tags() {
  echo '<title>Hasani Rogers | Web Developer</title>';
  echo '<meta name="author" content="Hasani Rogers">';
  echo '<meta name="title" content="Hasani Rogers | Web Developer">';
  echo '<meta name="description" content="My name is Hasani Rogers and I\'m a web developer who operates out of the Metro Detroit area in Michigan." />';
  echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
  echo '<meta property="og:type" content="website">';
  echo '<meta property="og:url" content="https://hasanirogers.me">';
  echo '<meta property="og:title" content="Hasani Rogers | Web Developer">';
  echo '<meta property="og:description" content="My name is Hasani Rogers and I\'m a web developer who operates out of the Metro Detroit area in Michigan.">';
  echo '<meta property="og:image" content="https://contact.hasanirogers.me/images/avatar.jpeg">';
  echo '<meta property="twitter:card" content="summary_large_image">';
  echo '<meta property="twitter:url" content="https://hasanirogers.me">';
  echo '<meta property="twitter:title" content="Hasani Rogers | Web Developer">';
  echo '<meta property="twitter:description" content="My name is Hasani Rogers and I\'m a web developer who operates out of the Metro Detroit area in Michigan.">';
  echo '<meta property="twitter:image" content="https://contact.hasanirogers.me/images/avatar.jpeg">';
  echo '<base href="/">';
}
add_action('wp_head', 'add_meta_tags', '1');

// disable meta tag
remove_action('wp_head', 'wp_generator');

// feature image support
add_theme_support( 'post-thumbnails', array( 'websites') );

// enqueue fonts
function add_fonts() {
    wp_enqueue_style( 'ubuntu-font', 'https://fonts.googleapis.com/css?family=Ubuntu', false );
}
add_action( 'wp_enqueue_scripts', 'add_fonts' );

// enqueue font end bundles
if (!is_admin()) {
  wp_enqueue_style('bundle-css', get_theme_file_uri('/bundles/frontend.css'));
  wp_enqueue_script('bundle-js', get_theme_file_uri('/bundles/frontend.js'), array(), false, true);
}

// enqueue admin bundles
if (is_admin()) {
  wp_enqueue_style('admin-css', get_theme_file_uri('/bundles/admin.css'));
  wp_enqueue_script('admin-js', get_theme_file_uri('/bundles/admin.js'), array('wp-blocks', 'wp-editor', 'wp-components'), false, true);
}

// not having this causes a redirect loop on prod for some reason
remove_filter('template_redirect', 'redirect_canonical');

// menus
function me_register_menus() {
  register_nav_menus(
    array(
      'hamburger-menu' => __( 'Hamburger Menu'),
      'footer-menu' => __( 'Footer Menu' ),
     )
   );
 }
 add_action( 'init', 'me_register_menus' );
