<?php
  function wp_menu_route() {
    $menuLocations = get_nav_menu_locations();
    return $menuLocations;
  }

  add_action( 'rest_api_init', function() {
    $args = [
      'methods' => 'GET',
      'callback' => 'wp_menu_route',
    ];
    register_rest_route( 'me/v1', '/menu', $args);
  });

  function wp_menu_single($data) {
      $menuID = $data['slug'];
      $menu = wp_get_nav_menu_items($menuID);
      return $menu;
  }

  add_action('rest_api_init', function() {
    $args = [
      'methods' => 'GET',
      'callback' => 'wp_menu_single',
    ];
    register_rest_route( 'me/v1', '/menu/(?P<slug>[a-zA-Z0-9-]+)', $args);
  });
