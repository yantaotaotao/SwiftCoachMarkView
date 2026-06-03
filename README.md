# CoachMarkView

一个基于 SwiftUI 的自定义提示组件，用于在指定目标视图下方显示带有箭头的提示气泡。

## 功能特点

- ✅ 根据目标视图位置自动定位提示气泡
- ✅ 箭头自动指向目标视图中心
- ✅ 气泡宽度固定为 200pt
- ✅ 支持点击关闭按钮关闭提示
- ✅ 支持界面滚动时自动更新位置
- ✅ 不拦截用户交互，允许底层视图正常响应滚动等操作

## 实现原理

### 1. 坐标系统转换

CoachMarkView 的核心是精确的坐标计算和转换：

```swift
// 在 ViewController 中计算目标位置
private func calculateTargetPosition() -> CGPoint? {
    collectionView.layoutIfNeeded()
    
    let indexPath = IndexPath(item: 0, section: 0)
    guard let cellFrame = collectionView.layoutAttributesForItem(at: indexPath)?.frame else {
        return nil
    }
    
    // 使用 UIKit 的 convert 方法将坐标从 collectionView 坐标系转换到 view 坐标系
    let cellCenterInCollectionView = CGPoint(x: cellFrame.midX, y: cellFrame.maxY)
    let targetPosition = collectionView.convert(cellCenterInCollectionView, to: view)
    
    return targetPosition
}
```

**关键点**：
- 使用 `layoutAttributesForItem` 获取 cell 在 collectionView 内部的 frame
- 使用 `convert(_:to:)` 方法进行坐标系转换，自动处理所有父视图层级
- `targetPosition` 表示目标视图底部中心点在主视图坐标系中的位置

### 2. 气泡定位算法

CoachMarkView 使用 `.position` modifier 进行精确定位：

```swift
.position(
    x: bubbleCenterX,
    y: targetPosition.y + (triangleHeight + bubbleContentHeight) / 2
)
```

**定位逻辑**：
- `bubbleCenterX`：气泡中心点的 x 坐标，限制在屏幕范围内
- `y` 坐标：气泡中心点 = 目标位置 y + 气泡总高度的一半

### 3. 箭头偏移计算

箭头需要根据目标位置动态调整在气泡中的位置：

```swift
private var arrowCenterX: CGFloat {
    // 计算箭头相对于气泡左边缘的位置
    let arrowX = targetPosition.x - (bubbleCenterX - bubbleWidth / 2)
    // 限制箭头在气泡范围内
    let minArrowX: CGFloat = triangleWidth / 2
    let maxArrowX: CGFloat = bubbleWidth - triangleWidth / 2
    return max(minArrowX, min(arrowX, maxArrowX))
}
```

### 4. 视图层级设计

CoachMarkView 作为独立视图层叠在主视图之上：

```swift
// 将 CoachMarkView 添加到主视图上，覆盖全屏但内容只显示在目标位置附近
NSLayoutConstraint.activate([
    hostVC.view.topAnchor.constraint(equalTo: view.topAnchor),
    hostVC.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
    hostVC.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
    hostVC.view.bottomAnchor.constraint(equalTo: view.bottomAnchor)
])
```

**关键设置**：
- `hostVC.view.isUserInteractionEnabled = false`：禁用交互，允许滚动事件穿透到底层 tableView

## 使用方法

### 1. 创建 CoachMarkView

```swift
let coachMark = CoachMarkView(
    title: "标题",
    content: "提示内容",
    targetPosition: targetPosition,  // 目标位置（主视图坐标系）
    containerSize: CGSize(width: view.bounds.width, height: view.bounds.height),
    onDismiss: { [weak self] in
        self?.hideCoachMark()
    }
)
```

### 2. 通过 UIHostingController 添加到视图

```swift
coachMarkHostingController = UIHostingController(rootView: coachMark)
guard let hostVC = coachMarkHostingController else { return }

hostVC.view.translatesAutoresizingMaskIntoConstraints = false
hostVC.view.backgroundColor = .clear
hostVC.view.isUserInteractionEnabled = false  // 关键：允许交互穿透

addChild(hostVC)
view.addSubview(hostVC.view)

NSLayoutConstraint.activate([
    hostVC.view.topAnchor.constraint(equalTo: view.topAnchor),
    hostVC.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
    hostVC.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
    hostVC.view.bottomAnchor.constraint(equalTo: view.bottomAnchor)
])

hostVC.didMove(toParent: self)
```

### 3. 监听滚动更新位置

```swift
func scrollViewDidScroll(_ scrollView: UIScrollView) {
    updateCoachMarkPosition()
}

private func updateCoachMarkPosition() {
    guard let hostVC = coachMarkHostingController else { return }
    guard let targetPosition = calculateTargetPosition() else { return }
    
    let updatedCoachMark = CoachMarkView(
        title: "标题",
        content: "提示内容",
        targetPosition: targetPosition,
        containerSize: CGSize(width: view.bounds.width, height: view.bounds.height),
        onDismiss: { [weak self] in
            self?.hideCoachMark()
        }
    )
    
    hostVC.rootView = updatedCoachMark
}
```

### 4. 隐藏 CoachMarkView

```swift
private func hideCoachMark() {
    coachMarkHostingController?.view.removeFromSuperview()
    coachMarkHostingController?.removeFromParent()
    coachMarkHostingController = nil
}
```

## 注意事项

1. **布局时机**：建议在 `viewDidLayoutSubviews` 中延迟执行 `showCoachMark()`，确保 collectionView 已完成布局

```swift
override func viewDidLayoutSubviews() {
    super.viewDidLayoutSubviews()
    
    if !coachMarkAdded && headerContainer.bounds.width > 0 && collectionView.bounds.width > 0 {
        coachMarkAdded = true
        DispatchQueue.main.async {
            self.showCoachMark()
        }
    }
}
```

2. **坐标转换**：确保使用 `convert(_:to:)` 方法进行坐标系转换，避免手动计算错误

3. **交互穿透**：设置 `hostVC.view.isUserInteractionEnabled = false` 允许底层视图响应触摸事件

## 文件结构

```
UIKitSwfit/
├── ViewController.swift    # 主视图控制器，集成 CoachMarkView
├── CoachMarkView.swift     # CoachMarkView 自定义组件
└── README.md               # 文档说明
```

## 技术要点总结

| 技术点 | 说明 |
|--------|------|
| 坐标系转换 | 使用 `UIView.convert(_:to:)` 进行精确坐标转换 |
| 视图定位 | 使用 SwiftUI 的 `.position` modifier 进行绝对定位 |
| 交互穿透 | 设置 `isUserInteractionEnabled = false` 允许事件传递 |
| 滚动更新 | 监听 `UIScrollViewDelegate` 动态更新位置 |
| 布局时机 | 在 `viewDidLayoutSubviews` 中确保视图已完成布局 |
