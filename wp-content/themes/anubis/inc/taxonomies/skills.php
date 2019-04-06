<?php

add_action( 'init', 'add_skills_taxonomy', 0);

function add_skills_taxonomy() {
    $labels = array(
        'name'                => 'Skills',
        'singular_name'       => 'Skill',
        'search_items'        => 'Search all skills',
        'all_items'           => 'All Skills',
        'most_used_items'     => null,
        'parent_item'         => null,
        'parent_item_colon'   => null,
        'edit_item'           => 'Edit Skills',
        'update_item'         => 'Update Skills',
        'add_new_item'        => 'Add a Skill',
        'new_item_name'       => 'New Skill',
        'menu_name'           => 'Skills'
    );

    register_taxonomy(
        'skills',
        array('work_history'),
        array(
            'hierarchical'    => false,
            'labels'          => $labels,
            'singular_name'   => 'Skill',
            'show_ui'         => true,
            'query_var'       => false,
            'show_in_rest'    => true
        )
    );
}
