<?php
/**
 * Twenty Seventeen functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 */

function my_deregister_scripts(){
    wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'my_deregister_scripts' );

add_filter('show_admin_bar', '__return_false');

wp_enqueue_style('bundle-css', get_theme_file_uri('/bundles/bundle.css'));

wp_enqueue_script('custom-elements-es5-adapter', get_theme_file_uri('/vendor/custom-elements-es5-adapter.js'));
wp_enqueue_script('bundle-js', get_theme_file_uri('/bundles/bundle.js'), ['custom-elements-es5-adapter'], false, true);
