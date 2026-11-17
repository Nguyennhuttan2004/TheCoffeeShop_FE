import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

function LoginRequiredDialog({ open, onOpenChange }) {
  const navigate = useNavigate();

  function handleLogin() {
    onOpenChange(false);
    navigate("/auth/login");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vui lòng đăng nhập</DialogTitle>
          <DialogDescription>
            Bạn cần đăng nhập để có thể thêm sản phẩm vào giỏ hàng.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleLogin}>Đăng nhập</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginRequiredDialog;
