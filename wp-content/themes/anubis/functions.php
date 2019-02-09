<?php
/**
 * @package WordPress
 * @subpackage Anubis
 * @since 1.0
 */


// includes
include_once('inc/taxonomies/skills.php');


// disable wp-embed
function disable_wp_embed(){
    wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'disable_wp_embed' );

// disable admin bar
add_filter('show_admin_bar', '__return_false');

// enque styles and scripts
if (!is_admin()) {
    wp_enqueue_style('bundle-css', get_theme_file_uri('/bundles/bundle.css'));

    wp_enqueue_script('custom-elements-es5-adapter', get_theme_file_uri('/vendor/custom-elements-es5-adapter.js'));
    wp_enqueue_script('bundle-js', get_theme_file_uri('/bundles/bundle.js'), ['custom-elements-es5-adapter'], false, true);
}
