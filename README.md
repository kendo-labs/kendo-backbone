# Kendo-Backbone

Sample projects and extensions to integrate
[Kendo UI](http://kendoui.com) with 
[Backbone.js](http://backbonejs.org)

## About Kendo-Backbone

Backbone provides a lot of great building blocks for creating 
well structured JavaScript application. It doesn't provide everything
you need, though. You, as a developer or designer, are still responsible
for implementing a lot of the actual user experience and this often
means using control suites like [Kendo UI](http://kendoui.com).

Generally speaking, working with Backbone and Kendo UI's widgets is
fairly straight-forward, as 
[Derick Bailey has shown in this blog post](http://www.kendoui.com/blogs/teamblog/posts/12-11-26/backbone_and_kendo_ui_a_beautiful_combination.aspx).
There are times, though, that additional integration points are 
needed. This project aims to provide an open source set of extensions and sample
projects, and gather up any relevant information to help

## Source Code and Downloads

All of source code can be found in the [src](src) folder of the
repository, with sub-folders for each area of Kendo UI that has
some integration with Backbone.

### Downloads

Downloads are separated in to distinct files based on the specific
framework that the file targets: Web, Mobile and DataViz. Each of these
files can be found in the [build](build) folder of the respository,
under their respective framework folder.

**Web**

  * Unminified (devevelopment version): [kendo.backbone.js](build/web/kendo.backbone.js)
  * Minified (production version): [kendo.backbone.min.js](build/web/kendo.backbone.min.js)
  * Source map (production debugging): [kendo.backbone.map](build/web/kendo.backbone.map)

## Documentation

Coming soon!

I wrote a blog post on [wrapping a Backbone.Collection in a
kendo.data.DataSource](http://www.kendoui.com/blogs/teamblog/posts/13-02-07/wrapping_a_backbone_collection_in_a_kendo_data_datasource.aspx).

## Compatibility and Requirements

Kendo-Backbone is designed to work with Kendo UI's web control
suite at this point, with additional support for the Kendo UI framework
that supports the web controls. Additional work to include integration
with Kendo UI Mobile is also in the works.

The Kendo-Backbone extension currently depend on the 
following libraries:

* [jQuery](http://www.jquery.com) v1.8.x
* [Kendo UI](http://www.kendoui.com) v2013.1.226
* [BackboneJS](http://backbonejs.org) v0.9.10
* [UnderscoreJS](http://underscorejs.org) v1.4.4

These extensions have not been tested against any other versions of 
these libraries. You may find that versions other than these are 
compatible, but we make no claims to support those version, 
nor can we troubleshoot issues that arise when using those 
versions.

### Running The Specs And Builds

Kendo-Backbone relies on [NodeJS](http://nodejs.org) and [GruntJS](http://gruntjs.com) for it's build and test
process. Once you have [downloaded NodeJS](http://nodejs.org/download/) and
installed it, run the following commands from a command prompt or
terminal window, in the project folder:

1. `npm install`
2. `npm install -g grunt-cli`
3. `grunt`

If the first two steps were successful, you should see the build
output from the GruntJS build process.

If you wish to run the specs in development mode for continuous
testing, you can use one of the following commands:

`grunt watch`

or

`grunt server`

The `grunt watch` command will start a PhantomJS server and run
all specs in the console window. The `grunt server` command will
start an instance of the "grunt-contrib-connect" web server and
host the specs at 
[http://localhost:8888/\_SpecRunner.html](http://localhost:888/_SpecRunner.html).

## How to Contribute

If you would like to contribute to Kendo-Backbone's source code, 
please read the 
[guidelines for pull requests and contributions](CONTRIBUTING.md). 
Following these guidelines will help make your contributions easier 
to bring in to the next release.

## Getting Help

Use this section to list ways that a developer can obtain help or 
support for this project, for instance, Stack Overflow. Make sure to 
also leave the following section:

As a part of Kendo UI Labs, Kendo-Backbone is intended to be a 
community-run project, and not an official part of any 
Kendo UI SKU (Web, DataViz, Mobile or Complete). As such, this 
project is not a supported part of Kendo UI, and is not covered 
under the support agreements for Kendo UI license holders. Please 
do not create Kendo UI support requests for this project, as these 
will be immediately closed and you'll be directed to post your 
question on a community forum.

## Release Notes

For change logs and release notes, see the [changelog](changelog.md) file.

## License Information

This project has been released under the 
[Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html), 
the text of which is included in the [LICENSE.md](LICENSE.md) file. 
This license applies ONLY to the project-specific source of each 
repository and does not extend to Kendo UI itself, or any other 3rd 
party libraries used in a repository. For licensing information about 
Kendo UI, see the 
[License Agreements page](https://www.kendoui.com/purchase/license-agreement.aspx) 
at [KendoUI.com](http://www.kendoui.com).
