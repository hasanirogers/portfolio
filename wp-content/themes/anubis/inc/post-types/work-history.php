<?php

  function add_work_history_post_type() {
    $labels = array(
      'name' => __('Work History'),
      'singular_name' => __('Work History')
    );

    register_post_type('work_history', array(
      'labels' => $labels,
      'public' => true,
      'has_archive' => false,
      'show_in_rest' => true
    ));
  }

  add_action('init', 'add_work_history_post_type');
