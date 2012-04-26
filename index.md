---
layout: page
title: Hello World!
tagline: []
---
{% include JB/setup %}

这是laihj的github blog.

#### 最近发布的文章

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

