<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Anubis
 * @since 1.0
 * @version 1.0
 */

wp_head(); ?>

    <nav class="menu">
        <me-hamburger class="menu__icon"></me-hamburger>
        <ul class="menu__items">
            <li><a href="/home/">Home</a></li>
            <li><a href="/education/">Education</a></li>
            <li><a href="/history/">History</a></li>
            <li><a href="/skills/">Skills</a></li>
            <li><a href="/websites/">Websites</a></li>
            <li><a href="/accomplishments/">Accomplishments</a></li>
        </ul>
    </nav>
    <main>
        <view-all appTitle="Hasani Rogers"></view-all>
    </main>
<?php wp_footer();
