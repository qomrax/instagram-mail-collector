import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

export function AdminAuth() {
    return applyDecorators(
        UseGuards(AdminGuard),
        ApiBearerAuth('AdminKey'),
    );
}