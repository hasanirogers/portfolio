<?php

  function add_website_post_type() {
    $labels = array(
      'name' => __('Websites'),
      'singular_name' => __('Website')
    );

    register_post_type('websites', array(
      'labels' => $labels,
      'public' => true,
      'has_archive' => false,
      'show_in_rest' => true,
      'supports' => array( 'title', 'editor', 'custom-fields', 'thumbnail' )
    ));
  }

  add_action('init', 'add_website_post_type');
