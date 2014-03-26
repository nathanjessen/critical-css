# Styleguide

## Basics
-Alphabetize properties
-Use tabs with four-space indent
-Put a space after :
-Put a space after the // for comments
-Put a space after commas (e.g. rgba(#000, 0.5))
-Choose a hexidecimal format and stick to it (e.g. #FFF or #fff)
-Do not use ids (only classes)

## Scss
-Do not nest deeper than 3 levels (with the exception of pseudo/hover states)
-Place mixin and @extend calls at the top of the properties list

## Components
-Component files should be named in the singular, unless your component's name is plural. For example:
--components/_button.sass
--components/_grid.sass
--components/_form.sass
-Components are broken down into the base component, subcomponents, modifiers, and states. If your component or subcomponent name is two words, use camelCase. For example, .componentName.

## Subcomponents
Subcomponents use the hyphen - separator to denote that it is a subcomponent to another component. For example, component-subcomponent.

## Modifiers
Use -- for a modifier on a component or subcomponent. For example:

.component--modifier
.component-subcomponent--modifier.

## States
Use the is-state, is-component-state, is-component-subcomponent-state pattern for your states. For example:

.is-active
.is-sidebar-toggled
.is-nav-item-active

## Context
Use has- for adding a context with specific styles on a component or subcomponent. For example:

<div class="nav has-dropdown">
  <!-- ... -->
</div>

.has-dropdown {
    position: relative;
}

## Sass Variables
Variables, as documented in Core - Settings, should follow the same naming conventions as your components, referenced above. The most global variables (used in multiple places, multiple contexts) are prefixed with $base-. Let's look at some examples:

$base-background: #eee
$base-color: #444
$base-borderRadius: 3px
$base-fontSize: 16px
$base-lineHeight: 1.6
$base-whitespace: 20px
Content and layout variables are prefixed with $c- and $l-, respectively.

$c-header-color: #999
$c-header-fontFamily: sans-serif
$l-maxWidth: 960px
$l-sidebar-width: 200px
You may also create component-specific variables, like so:

$grid-breakpoint-lap: 480px
$grid-breakpoint-desk: 800px
$grid-gutter: 20px
$form-fontSize: 12px
$form-input-background: #ddd

## Hierarchy
-Do not use .block--left or .block--right
-Do use .block--a and .block--b to semantically establish hierarchy

## Images
A section about naming images? I know. Let's just get through it.

bg-* for backgrounds
icn-* for icons
logo-* for logos
img-* for generic images
Sub-folders for larger groups

