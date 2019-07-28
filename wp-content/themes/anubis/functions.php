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

// meta tags
function add_meta_tags() {
  echo '<meta name="author" content="Hasani Rogers">';
  echo '<meta name="keywords" content="developer, front end, front end developer, web components, lit element">';
  echo '<meta name="description" content="I am Front End Developer who specializes in the presentation layer of the web. I\'m also a proponent of web components." />';
  echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
}
add_action('wp_head', 'add_meta_tags', '1');

// feature image support
add_theme_support( 'post-thumbnails', array( 'websites') );

// enqueue fonts
function add_fonts() {
    wp_enqueue_style( 'ubuntu-font', 'https://fonts.googleapis.com/css?family=Ubuntu', false );
}
add_action( 'wp_enqueue_scripts', 'add_fonts' );


// enque styles and scripts
wp_enqueue_style('admin-css', get_theme_file_uri('/admin.css'));

if (!is_admin()) {
    wp_enqueue_style('bundle-css', get_theme_file_uri('/bundles/bundle.css'));

    wp_enqueue_script('custom-elements-es5-adapter', get_theme_file_uri('/vendor/custom-elements-es5-adapter.js'));
    wp_enqueue_script('bundle-js', get_theme_file_uri('/bundles/bundle.js'), ['custom-elements-es5-adapter'], false, true);
}

// not having this causes a redirect loop on prod for some reason
remove_filter('template_redirect', 'redirect_canonical');
