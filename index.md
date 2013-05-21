---
layout: page
title: build apps
tagline: []
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li><h2><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></h2>
        <p>{{ post.content }}</p>
    </li>
  {% endfor %}
</ul>

