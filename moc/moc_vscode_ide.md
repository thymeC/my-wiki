# MOC：VS Code / Cursor IDE 界面图标大小

> 记录问题：Code / VS Code / Cursor 里的图标看起来太大时，优先用哪些设置把界面调小。
> 仓库规则：[[REPO_LAYOUT]]；总入口：[[moc_index]]。

## 想搞懂的问题

- IDE 左侧活动栏、资源管理器或顶部区域的图标太大时，应该调哪个设置？
- 如何区分是「界面缩放太大」、还是「代码字体太大」？

## 快速结论

- VS Code / Cursor 没有单独的「活动栏图标大小」滑块。
- 如果是整个 IDE 的图标、菜单、侧边栏都偏大，优先降低 `window.zoomLevel`。
- 如果只是代码文字太大，调 `editor.fontSize`。
- 如果只是终端文字太大，调 `terminal.integrated.fontSize`。
- 如果只是资源管理器里的文件图标太显眼，可以换更简洁的 File Icon Theme，或者关闭文件图标主题。

## 推荐设置

打开命令面板：

- macOS：`Cmd+Shift+P`
- Windows / Linux：`Ctrl+Shift+P`

搜索并打开 **Preferences: Open User Settings (JSON)**，加入或调整：

```json
{
  "window.zoomLevel": -0.5,
  "editor.fontSize": 13,
  "terminal.integrated.fontSize": 13
}
```

说明：

- `window.zoomLevel`: 调整整个 IDE 的 UI 缩放，图标、菜单、侧边栏都会变小或变大。
- `editor.fontSize`: 只影响代码编辑区字体大小。
- `terminal.integrated.fontSize`: 只影响内置终端字体大小。

## 调整步骤

### 1. 先调整体界面缩放

如果图标和菜单整体都太大：

1. 打开命令面板。
2. 搜索 **Window: Zoom Out**，先缩小一次看看效果。
3. 如果需要固定下来，在 Settings JSON 中设置：

```json
{
  "window.zoomLevel": -0.5
}
```

可以尝试的值：

- `0`: 默认大小
- `-0.25`: 略微缩小
- `-0.5`: 常用的轻度缩小
- `-1`: 明显缩小

### 2. 再确认是不是代码字体太大

如果只是代码区域看起来太大，不需要调整个界面：

```json
{
  "editor.fontSize": 13
}
```

### 3. 文件图标太抢眼时，换图标主题

如果主要是资源管理器里的文件图标太花或太显眼：

1. 打开命令面板。
2. 搜索 **Preferences: File Icon Theme**。
3. 选择更简洁的主题，或选择 **None** 关闭文件图标主题。

也可以在 Settings JSON 中关闭：

```json
{
  "workbench.iconTheme": null
}
```

## 注意

- `window.zoomLevel` 会影响整个 IDE，不只影响图标。
- 如果指的是系统 Dock / 任务栏里的 VS Code 应用图标大小，那通常不是 VS Code 设置，需要在操作系统的 Dock、任务栏或桌面环境里调整。
- Cursor 基于 VS Code，以上设置大多可以共用。

## 待整理进 `areas/` 的要点

- 如果以后整理 IDE 使用指南，可以把「界面缩放、字体、图标主题」合并成一篇完整的 VS Code / Cursor 设置速查。
