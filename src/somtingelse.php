<?php
add_role( 'basic_contributor'
'Basic Contributor'
)
array(
'read'
=› true,
'edit_posts' => true,
'upload _files' => true,
	));
$role = get_role('basic_contributor");

$role-›add_cap( 'access_to_something', true);

$role-›remove_cap( 'upload _files', true);
if ( $role-›has_ cap('edit_posts") ) { 
}
