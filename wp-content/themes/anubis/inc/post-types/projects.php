<?php

  function add_projects_post_type() {
    $labels = [
      'name' => __('Projects'),
      'singular_name' => __('Project')
    ];

    $supports = [
      'title',
      'editor',
      'custom-fields',
      'thumbnail'
    ];

    $taxonomies = [
      'skills'
    ];

    register_post_type('projects', array(
      'labels' => $labels,
      'public' => true,
      'has_archive' => false,
      'show_in_rest' => true,
      'supports' => $supports,
      'taxonomies' => $taxonomies
    ));
  }

  add_action('init', 'add_projects_post_type');
