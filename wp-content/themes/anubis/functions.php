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
  echo '<meta name="author" content="Hasani Rogers">';
  echo '<meta name="keywords" content="developer, front end, front end developer, web components, lit element">';
  echo '<meta name="description" content="I am Front End Developer who specializes in the presentation layer of the web. I\'m also a proponent of web components." />';
  echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
}
add_action('wp_head', 'add_meta_tags', '1');

// disable meta tag
remove_action('wp_head', 'wp_generator');

// es5 adapter
function add_es5_adapter() {
  if (!is_admin()) {
    echo '<script>
      if (!window.customElements) {
        document.write(\'<!--\');
      }
    </script>
    <script src="'. get_theme_file_uri('vendor/custom-elements-es5-adapter.js') .'"></script>
    <!-- DO NOT REMOVE THIS COMMENT -->';
  }
}
add_action('wp_head', 'add_es5_adapter', '1');

// feature image support
add_theme_support( 'post-thumbnails', array( 'websites') );

// enqueue fonts
function add_fonts() {
    wp_enqueue_style( 'ubuntu-font', 'https://fonts.googleapis.com/css?family=Ubuntu', false );
}
add_action( 'wp_enqueue_scripts', 'add_fonts' );

// enqueue styles and scripts
wp_enqueue_style('admin-css', get_theme_file_uri('/admin.css'));

if (!is_admin()) {
    wp_enqueue_script('webcomponent-loader', get_theme_file_uri('/vendor/webcomponents-loader.js'), [], false, true);
    wp_enqueue_script('bundle-js', get_theme_file_uri('/bundles/bundle.js'), [], false, true);
    wp_enqueue_style('bundle-css', get_theme_file_uri('/bundles/bundle.css'));
}

// not having this causes a redirect loop on prod for some reason
remove_filter('template_redirect', 'redirect_canonical');
