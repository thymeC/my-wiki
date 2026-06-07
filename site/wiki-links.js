/** Obsidian [[wikilink]] → Docsify markdown link */
window.WIKI_LINKS = {
  README: "README.md",
  DEVELOPER: "DEVELOPER.md",
  REPO_LAYOUT: "REPO_LAYOUT.md",
  moc_index: "moc/moc_index.md",
  moc_ai_model_benchmark: "moc/moc_ai_model_benchmark.md",
  moc_ide_plugins: "moc/moc_ide_plugins.md",
  moc_vscode_ide: "moc/moc_vscode_ide.md",
  moc_react_deployment: "moc/moc_react_deployment.md",
  moc_jnstall_nvm_nodejs: "moc/moc_jnstall_nvm_nodejs.md",
  moc_category_rule: "moc/moc_category_rule.md",
  moc_organization_models: "moc/moc_organization_models.md",
  "organization-models-reference": "areas/management/organization-models-reference.md",
  "programming-knowledge-core": "areas/programming/languages/programming-knowledge-core.md",
  "design-patterns-guide": "areas/programming/languages/design-patterns-guide.md",
  "dsa-guide-with-code": "areas/programming/algorithms/dsa-guide-with-code.md",
  "python-quick-guide": "areas/programming/languages/python-quick-guide.md",
  "go-quick-guide": "areas/programming/languages/go-quick-guide.md",
  "java-quick-guide": "areas/programming/languages/java-quick-guide.md",
  "javascript-typescript-quick-guide": "areas/programming/languages/javascript-typescript-quick-guide.md",
  "python-frameworks-index": "areas/programming/frameworks/python-frameworks-index.md",
  "python-flask-guide": "areas/programming/frameworks/python-flask-guide.md",
  "python-fastapi-guide": "areas/programming/frameworks/python-fastapi-guide.md",
  "python-django-guide": "areas/programming/frameworks/python-django-guide.md",
  "python-sqlalchemy-guide": "areas/programming/frameworks/python-sqlalchemy-guide.md",
  "python-celery-guide": "areas/programming/frameworks/python-celery-guide.md",
  "spring-boot-guide": "areas/programming/frameworks/spring-boot-guide.md",
  "go-frameworks-index": "areas/programming/frameworks/go-frameworks-index.md",
  "go-net-http-guide": "areas/programming/frameworks/go-net-http-guide.md",
  "go-gin-guide": "areas/programming/frameworks/go-gin-guide.md",
  "go-echo-guide": "areas/programming/frameworks/go-echo-guide.md",
  "go-chi-guide": "areas/programming/frameworks/go-chi-guide.md",
  "frontend-stack-index": "areas/programming/frameworks/frontend-stack-index.md",
  "react-ecosystem-guide": "areas/programming/frameworks/react-ecosystem-guide.md",
  "vue-framework-guide": "areas/programming/frameworks/vue-framework-guide.md",
  "react-concepts-guide": "areas/programming/tools/react-concepts-guide.md",
  "vue-guide": "areas/programming/tools/vue-guide.md",
  "openclaw-workflow": "areas/programming/ai/openclaw-workflow.md",
};

window.wikiLinkPlugin = function (hook) {
  hook.beforeEach(function (content) {
    return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, target, label) {
      var name = target.trim();
      var text = (label || name).trim();
      var path = window.WIKI_LINKS[name] || window.WIKI_LINKS[name.replace(/\.md$/i, "")];
      if (path) return "[" + text + "](" + path + ")";
      return '<span class="wikilink-missing">[[' + text + "]]</span>";
    });
  });
};
